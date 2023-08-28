import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddCustomerComponent } from '../dialog-add-customer/dialog-add-customer.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { WebsiteComponent } from '../website/website.component';

@Component({
  selector: 'app-user',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  constructor(private site: WebsiteComponent,public dialog: MatDialog, private firestore: AngularFirestore) { this.userId = this.site.test;}
  allUsers = [];
  userId:any;
  ngOnInit() {
      this.firestore.collection('customer')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => this.allUsers = changes);
  }

  openDialog() {
    this.dialog.open(DialogAddCustomerComponent);
  }

  mailto(e:Event, email:string){
    e.stopPropagation();
    window.open("mailto:" + email );
  }
}
