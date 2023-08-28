import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { WebsiteComponent } from '../website/website.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(public dialog: MatDialog, private firestore: AngularFirestore, private site: WebsiteComponent) { this.userId = this.site.test; }
  allUsers = [];
  userId: any;
  user: any = {};

  ngOnInit() {
    this.firestore.collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => this.allUsers = changes);
  }

  openDialogEditUser() {
    this.dialog.open(DialogEditUserComponent);
  }

  openDialogAddUser() {
    this.dialog.open(DialogAddUserComponent);
  }

  mailto(e:Event, email:string){
    e.stopPropagation();
    window.open("mailto:" + email );
  }
}
