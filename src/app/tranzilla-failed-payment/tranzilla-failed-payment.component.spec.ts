import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranzillaFailedPaymentComponent } from './tranzilla-failed-payment.component';

describe('TranzillaFailedPaymentComponent', () => {
  let component: TranzillaFailedPaymentComponent;
  let fixture: ComponentFixture<TranzillaFailedPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranzillaFailedPaymentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranzillaFailedPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
