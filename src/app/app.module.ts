import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { CustomerComponent } from './customer/customer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddCustomerComponent } from './dialog-add-customer/dialog-add-customer.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditCustomerAddressComponent } from './dialog-edit-customer-address/dialog-edit-customer-address.component';
import { DialogEditCustomerComponent } from './dialog-edit-customer/dialog-edit-customer.component';
import { CustomerNoticesComponent } from './customer-notices/customer-notices.component';
import { DialogAddCustomerNoticeComponent } from './dialog-add-customer-notice/dialog-add-customer-notice.component';
import { MatSortModule } from '@angular/material/sort';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InvoiceToCustomerComponent } from './invoice-to-customer/invoice-to-customer.component';
import { MatSelectModule } from '@angular/material/select';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { CustomerInvoicesComponent } from './customer-invoices/customer-invoices.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { WebsiteComponent } from './website/website.component';
import { UserComponent } from './user/user.component';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { DialogForgotPasswordComponent } from './dialog-forgot-password/dialog-forgot-password.component';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { PreImpressumComponent } from './pre-impressum/pre-impressum.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { PreDataProtectionComponent } from './pre-data-protection/pre-data-protection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatListModule} from '@angular/material/list';
import { BackButtonComponent } from './back-button/back-button.component';
import { HeaderMobileComponent } from './website/header-mobile/header-mobile.component';
@NgModule({
  declarations: [
    CustomerComponent,
    DialogAddCustomerComponent,
    DialogAddUserComponent,
    CustomerDetailComponent,
    DialogEditCustomerAddressComponent,
    DialogEditCustomerComponent,
    CustomerNoticesComponent,
    DialogAddCustomerNoticeComponent,
    NewsletterComponent,
    InvoiceToCustomerComponent,
    CustomerInvoicesComponent,
    LoginComponent,
    WebsiteComponent,
    UserComponent,
    DialogForgotPasswordComponent,
    DialogEditUserComponent,
    UserDetailComponent,
    PreImpressumComponent,
    ImpressumComponent,
    DataProtectionComponent,
    PreDataProtectionComponent,
    AppComponent,
    BackButtonComponent,
    HeaderMobileComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatProgressBarModule,
    MatCardModule,
    MatMenuModule,
    MatSortModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    
    DashboardComponent,
    MatButtonToggleModule,
    MatListModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
