import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { PaymentHistoryRoutingModule } from './payment-history-routing.module';
import { PaymentHistoryComponent } from './payment-history.component';
import { RegistrationRenewalModule } from '@app/registration-renewal/registration-renewal.module';

@NgModule({
  imports: [CommonModule, TranslateModule, PaymentHistoryRoutingModule, RegistrationRenewalModule],
  declarations: [PaymentHistoryComponent],
})
export class PaymentHistoryModule {}
