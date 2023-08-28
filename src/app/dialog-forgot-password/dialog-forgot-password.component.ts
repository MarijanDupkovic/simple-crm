import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-forgot-password',
  templateUrl: './dialog-forgot-password.component.html',
  styleUrls: ['./dialog-forgot-password.component.scss']
})
export class DialogForgotPasswordComponent {
  loading: boolean = false;
  incorrect:boolean = false;
  rs = { mail: '' };
  constructor(public dialogRef: MatDialogRef<DialogForgotPasswordComponent>, public auth: AngularFireAuth) { }

  sendResetMail() {
    this.loading = true;
    this.auth.sendPasswordResetEmail(this.rs.mail).then(() => {
      this.loading = false;
      this.dialogRef.close();
    })
    .catch((error:any) => {
      this.incorrect = true;
      return false;
    });
  }
}
