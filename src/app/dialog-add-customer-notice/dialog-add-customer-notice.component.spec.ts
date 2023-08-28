import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddUserNoticeComponent } from './dialog-add-customer-notice.component';

describe('DialogAddUserNoticeComponent', () => {
  let component: DialogAddUserNoticeComponent;
  let fixture: ComponentFixture<DialogAddUserNoticeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddUserNoticeComponent]
    });
    fixture = TestBed.createComponent(DialogAddUserNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
