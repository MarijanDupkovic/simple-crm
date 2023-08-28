import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/models/customer.class';

@Component({
  selector: 'app-customer-invoices',
  templateUrl: './customer-invoices.component.html',
  styleUrls: ['./customer-invoices.component.scss']
})
export class CustomerInvoicesComponent implements OnInit {
  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private fireStorage: AngularFireStorage) { }
  userId: any = '';
  user: Customer = new Customer();
  date = new Date().toLocaleDateString();

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      this.getInvoices();
    })
  }

  getInvoices() {
    this.firestore
      .collection('customer')
      .doc(this.userId)
      .valueChanges()
      .subscribe((user: any) => this.user = new Customer(user));
  }

  getInvoicePDF(invoiceNumber: number) {
    let storageRef = this.fireStorage.storage.ref('invoices/' + this.userId);
    storageRef.listAll().then((result) => {
      if (result.items) result.items.forEach((item) => {
        item.getDownloadURL()
          .then((link) => { if (link.includes(invoiceNumber + '.pdf')) open(link) });
      });
    });
  }
}



