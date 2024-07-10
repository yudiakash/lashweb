import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranzillaSuccessfullPaymentComponent } from './tranzilla-successfull-payment.component';

describe('TranzillaSuccessfullPaymentComponent', () => {
  let component: TranzillaSuccessfullPaymentComponent;
  let fixture: ComponentFixture<TranzillaSuccessfullPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranzillaSuccessfullPaymentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranzillaSuccessfullPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
