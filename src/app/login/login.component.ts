import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogForgotPasswordComponent } from '../dialog-forgot-password/dialog-forgot-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  static auth: any;
  incorrect: boolean = false;
  hide: boolean = true;
  loading: boolean = false;
  constructor(public auth: AngularFireAuth, private router: Router, public dialog: MatDialog) {

  }
  public loginForm = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  login() {
    if (this.loginForm.controls.userEmail.value && this.loginForm.controls.userPassword.value) {
      this.loading = true;

      this.auth.signInWithEmailAndPassword(this.loginForm.controls.userEmail.value!, this.loginForm.controls.userPassword.value!)
        .then((result: any) => {
          this.incorrect = false;
          this.loading = false;
          if (result.user.uid) this.router.navigateByUrl(`site/${result.user.uid}/dashboard`);
        })
        .catch((error: any) => {
          this.incorrect = true;
          this.loading = false;
          return false;
        });
    }
  }

  guestLogin() {
    this.loading = true;
    this.loginForm.controls.userEmail.setValue('guest@marijandupkovic.com');
    this.loginForm.controls.userPassword.setValue('123456A!');
    this.login();
  }


  openDialog() {
    this.dialog.open(DialogForgotPasswordComponent);
  }
}
