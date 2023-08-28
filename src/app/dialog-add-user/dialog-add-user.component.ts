import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user: User = new User();
  loading: boolean = false;
  constructor(public auth: AngularFireAuth, public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: AngularFirestore) {}
  saveUser() {
    this.loading = true;
    this.auth.createUserWithEmailAndPassword(this.user.email, '123456A!')
    .then((result: any) => { if (result) this.auth.sendPasswordResetEmail(this.user.email).then(() => this.loading = false)});
    this.firestore
      .collection('users')
      .add(this.user.toJson())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      });

  }
}
