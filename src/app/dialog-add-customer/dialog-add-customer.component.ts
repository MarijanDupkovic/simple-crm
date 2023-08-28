import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/models/customer.class';
@Component({
  selector: 'app-dialog-add-customer',
  templateUrl: './dialog-add-customer.component.html',
  styleUrls: ['./dialog-add-customer.component.scss']
})
export class DialogAddCustomerComponent {
  user: Customer = new Customer();
  birthDate!: Date;
  loading: boolean = false;
  notice: string = 'User succesfully created';
  alert: boolean = false;
  dialog: boolean = false;
  constructor(public dialogRef: MatDialogRef<DialogAddCustomerComponent>, private firestore: AngularFirestore) { }

  public addCustomer = new FormGroup({
    company: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    street: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  });

  saveUser() {
    if (this.addCustomer.valid) this.saveUserToDatabase();
    else this.isIncorrect();
  }

  saveUserToDatabase() {
    this.setUser();
    this.firestore
      .collection('customer')
      .add(this.user.toJson())
      .then(() => this.loadComplete());
  }

  close() {
    this.dialog = false;
  }

  loadComplete() {
    this.loading = false;
    this.dialogRef.close();
    this.dialog = true;
  }

  setUser() {
    let date = new Date().toLocaleString();
    this.user.notices.push({ 'notice': this.notice, 'date': date });
    this.loading = true;
    this.user.company = this.addCustomer.controls['company'].value!;
    this.user.email = this.addCustomer.controls['email'].value!;
    this.user.street = this.addCustomer.controls['street'].value!;
    this.user.city = this.addCustomer.controls['city'].value!;
    this.user.zipCode = +this.addCustomer.controls['zipCode'].value!;
  }

  isIncorrect() {
    setTimeout(() => {
      this.loading = false;
      this.alert = true;
    }, 1000);
  }
}
