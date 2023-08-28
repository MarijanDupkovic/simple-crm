import { Component } from '@angular/core';
import { Customer } from 'src/models/customer.class';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-edit-customer-address',
  templateUrl: './dialog-edit-customer-address.component.html',
  styleUrls: ['./dialog-edit-customer-address.component.scss']
})
export class DialogEditCustomerAddressComponent {
  user!: Customer;
  loading: boolean = false;
  userId!: string;
  alert: boolean = false;

  editCustomerAddress = new FormGroup({
    street: new FormControl('', [Validators.required, Validators.minLength(1)]),
    city: new FormControl('', [Validators.required, Validators.minLength(1)]),
    zipCode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
  });
  constructor(public dialogRef: MatDialogRef<DialogEditCustomerAddressComponent>, private firestore: AngularFirestore) { }

  saveUser() {
    if (this.editCustomerAddress.valid) {
      this.loading = true;
      this.firestore.collection('customer')
        .doc(this.userId)
        .update(this.user.toJson())
        .then(() => {
          this.loading = false;
          this.dialogRef.close();
        });
    } else this.isIncorrect();
  }

  isIncorrect() {
    setTimeout(() => {
      this.loading = false;
      this.alert = true;
    }, 1000);
  }
}
