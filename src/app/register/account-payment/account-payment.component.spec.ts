import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPaymentComponent } from './account-payment.component';

describe('AccountPaymentComponent', () => {
  let component: AccountPaymentComponent;
  let fixture: ComponentFixture<AccountPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountPaymentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
