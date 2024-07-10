import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationRenewalComponent } from './registration-renewal.component';

describe('RegistrationRenewalComponent', () => {
  let component: RegistrationRenewalComponent;
  let fixture: ComponentFixture<RegistrationRenewalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationRenewalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationRenewalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
