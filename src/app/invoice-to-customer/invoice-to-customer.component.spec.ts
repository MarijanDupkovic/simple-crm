import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceToCustomerComponent } from './invoice-to-customer.component';

describe('InvoiceToCustomerComponent', () => {
  let component: InvoiceToCustomerComponent;
  let fixture: ComponentFixture<InvoiceToCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceToCustomerComponent]
    });
    fixture = TestBed.createComponent(InvoiceToCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
