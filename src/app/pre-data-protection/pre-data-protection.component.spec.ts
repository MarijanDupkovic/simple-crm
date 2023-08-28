import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDataProtectionComponent } from './pre-data-protection.component';

describe('PreDataProtectionComponent', () => {
  let component: PreDataProtectionComponent;
  let fixture: ComponentFixture<PreDataProtectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreDataProtectionComponent]
    });
    fixture = TestBed.createComponent(PreDataProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
