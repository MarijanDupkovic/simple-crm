import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreImpressumComponent } from './pre-impressum.component';

describe('PreImpressumComponent', () => {
  let component: PreImpressumComponent;
  let fixture: ComponentFixture<PreImpressumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreImpressumComponent]
    });
    fixture = TestBed.createComponent(PreImpressumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
