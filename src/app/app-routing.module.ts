import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { InvoiceToCustomerComponent } from './invoice-to-customer/invoice-to-customer.component';
import { CustomerInvoicesComponent } from './customer-invoices/customer-invoices.component';
import { LoginComponent } from './login/login.component';
import { WebsiteComponent } from './website/website.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { PreDataProtectionComponent } from './pre-data-protection/pre-data-protection.component';
import { PreImpressumComponent } from './pre-impressum/pre-impressum.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'legal-notice', component: PreImpressumComponent },
  { path: 'data-protection', component: PreDataProtectionComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'site/:uid', component: WebsiteComponent, canActivate: [AngularFireAuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'customer/:id', component: CustomerDetailComponent },
      { path: 'customer/:id/invoices', component: CustomerInvoicesComponent },
      { path: 'invoice', component: InvoiceToCustomerComponent },
      { path: 'newsletter', component: NewsletterComponent },
      { path: 'user', component: UserComponent },
      { path: 'user/:id', component: UserDetailComponent },
      { path: 'legal-notice', component: ImpressumComponent },
      { path: 'data-protection', component: DataProtectionComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
