import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountPaymentRoutingModule } from './account-payment-routing.module';
import { AccountPaymentComponent } from './account-payment.component';

@NgModule({
  imports: [CommonModule, TranslateModule, AccountPaymentRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [AccountPaymentComponent],
})
export class AccountPaymentModule {}
