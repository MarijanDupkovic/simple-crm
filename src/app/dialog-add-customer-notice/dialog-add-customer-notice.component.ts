import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/models/customer.class';

@Component({
  selector: 'app-dialog-add-customer-notice',
  templateUrl: './dialog-add-customer-notice.component.html',
  styleUrls: ['./dialog-add-customer-notice.component.scss']
})
export class DialogAddCustomerNoticeComponent implements OnInit {
  user: Customer = new Customer();
  loading: boolean = false;
  notice!: string;
  userId!: any;
  alert: boolean = false;

  addNotice = new FormGroup({
    notice: new FormControl('',[Validators.required, Validators.minLength(5)]),
  });

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialogRef: MatDialogRef<DialogAddCustomerNoticeComponent>) { }
  ngOnInit() {
    let id = window.location.pathname.split('/');
    this.userId = id[id.length - 1];
    this.route.paramMap.subscribe(() => this.getUser());
  }

  getUser() {
    this.firestore
      .collection('customer')
      .doc(this.userId)
      .valueChanges()
      .subscribe((user: any) => this.user = new Customer(user));
  }
  saveNotice() {
    if(this.addNotice.valid){
      this.loading = true;
      let date = new Date().toLocaleString();
      this.user.notices.push({ 'notice': this.addNotice.controls.notice.value, 'date': date });
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
