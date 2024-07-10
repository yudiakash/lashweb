import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RegistrationRenewalModule } from '@app/registration-renewal/registration-renewal.module';
import { TranzillaSuccessfullPaymentRoutingModule } from './tranzilla-successfull-payment-routing.module';
import { TranzillaSuccessfullPaymentComponent } from './tranzilla-successfull-payment.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    TranzillaSuccessfullPaymentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RegistrationRenewalModule,
  ],
  declarations: [TranzillaSuccessfullPaymentComponent],
})
export class TranzillaSuccessfullPaymentModule {}
