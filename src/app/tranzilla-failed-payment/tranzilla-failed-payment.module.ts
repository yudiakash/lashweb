import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RegistrationRenewalModule } from '@app/registration-renewal/registration-renewal.module';
import { TranzillaFailedPaymentRoutingModule } from './tranzilla-failed-payment-routing.module';
import { TranzillaFailedPaymentComponent } from './tranzilla-failed-payment.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    TranzillaFailedPaymentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RegistrationRenewalModule,
  ],
  declarations: [TranzillaFailedPaymentComponent],
})
export class TranzillaFailedPaymentModule {}
