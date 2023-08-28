import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Customer } from 'src/models/customer.class';
import { DialogAddCustomerNoticeComponent } from '../dialog-add-customer-notice/dialog-add-customer-notice.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Sort} from '@angular/material/sort';

@Component({
  selector: 'app-customer-notices',
  templateUrl: './customer-notices.component.html',
  styleUrls: ['./customer-notices.component.scss']
})
export class CustomerNoticesComponent {
  constructor(private firestore: AngularFirestore,public dialog: MatDialog,private route: ActivatedRoute){}
  user: Customer = new Customer();
  userId:any = '';
  ngOnInit() {
    let id = window.location.pathname.split('/');
    this.userId = id[id.length-1];
    this.route.paramMap.subscribe( () => this.getUser());
  }

  getUser(){
    this.firestore
    .collection('customer')
    .doc(this.userId)
    .valueChanges()
    .subscribe((user:any) => this.user = new Customer(user));
  }

  addNoticeDialog() {
    this.dialog.open(DialogAddCustomerNoticeComponent);
  }
}
