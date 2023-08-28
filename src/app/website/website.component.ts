import { AfterViewInit, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';
@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss'],
})
export class WebsiteComponent implements AfterViewInit {

  public test: any;
  loading: boolean = false;
  dialog: boolean = false;
  userMail!: string;
  sidenav!: MatDrawer;
  drawer!: MatDrawer;
  @Input() opened!: boolean;

  constructor(public auth: AngularFireAuth, private route: ActivatedRoute, private observer: BreakpointObserver) {
    this.test = this.route.snapshot.paramMap.get('uid');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
        if (res.matches) this.opened = false;
        else this.opened = true;
      });
    }, 50);
  }

  sendResetPasswordMail() {
    this.auth.user.forEach((u: any) => {
      if (u.uid && u.uid == this.test) this.auth.sendPasswordResetEmail(u.email).then(() => {
        this.userMail = u.email;
        this.dialog = true
      })
    });
  }

  logout() {
    this.auth.signOut().then(() => {
      window.location.assign('');
    });
  }

  close() {
    this.dialog = false;
  }
}