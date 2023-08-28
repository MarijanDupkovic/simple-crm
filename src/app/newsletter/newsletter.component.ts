import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent {
  loading:boolean = false;
  allUsers = [];
  subject:string = '';
  message:string = '';
  https: HttpClient;
  success: boolean = false;
  sending:boolean = false;
  date = new Date().toLocaleString();
  public contactForm = new FormGroup({
    subject: new FormControl('', [Validators.required, Validators.minLength(2)]),
    message: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor(private firestore: AngularFirestore, http: HttpClient){ this.https = http;}

  ngOnInit() {
    this.firestore.collection('customer')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => this.allUsers = changes);
  }
  postVars = {
    mail: '',
    subject: '',
    message: this.contactForm.controls.message.value
  };
  sendNewsletter(){
    let endpoint = 'https://marijandupkovic.com/send_mail_crm_newsletter.php';
    this.postVars.subject = this.contactForm.controls.subject.value!.toString();
    this.postVars.message = this.contactForm.controls.message.value!.toString();
    this.postVars.message = this.postVars.message.replace(/\n/g, '<br>');
    this.allUsers.forEach(user => {
      this.postVars.mail = user['email'];
      return this.https.post(endpoint, this.postVars).subscribe(
        (res) => console.log(res),
        (err) => {
          this.sending = true;
          setTimeout(()=>{
            if(err.statusText == 'OK'){
              this.sending = false;
              this.success = true;
            }
          },1000); 
        }
      );
    })
    this.firestore.collection('newsletter')
    .add({subject:this.postVars.subject,message:this.postVars.message,date:this.date})
    .then(() => {
      setTimeout(() => {
        this.success = false;
        this.contactForm.reset();
        this.contactForm.clearValidators();
        this.contactForm.markAsUntouched();
      }, 3000);
    });
  }
}
