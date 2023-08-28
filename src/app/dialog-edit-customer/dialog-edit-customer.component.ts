import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/models/customer.class';

@Component({
  selector: 'app-dialog-edit-customer',
  templateUrl: './dialog-edit-customer.component.html',
  styleUrls: ['./dialog-edit-customer.component.scss']
})
export class DialogEditCustomerComponent {
  user!: Customer;
  loading: boolean = false;
  birthDate!: Date;
  userId!: string;
  alert: boolean = false;

  public editCustomerNameAndMail = new FormGroup({
    company: new FormControl('', [Validators.required, Validators.minLength(1)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(public dialogRef: MatDialogRef<DialogEditCustomerComponent>, private firestore: AngularFirestore) { }

  saveUser() {
    if (this.editCustomerNameAndMail.valid) {
      this.loading = true;
      this.firestore.collection('customer')
        .doc(this.userId)
        .update(this.user.toJson())
        .then(() => {
          this.loading = false;
          this.dialogRef.close();
        });
    }
    else this.isIncorrect();
  }

  isIncorrect() {
    setTimeout(() => {
      this.loading = false;
      this.alert = true;
    }, 1000);
  }
}
