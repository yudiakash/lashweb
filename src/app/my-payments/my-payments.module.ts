import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyPaymentsRoutingModule } from './my-payments-routing.module';
import { MyPaymentsComponent } from './my-payments.component';
import { RegistrationRenewalModule } from '@app/registration-renewal/registration-renewal.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MyPaymentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RegistrationRenewalModule,
  ],
  declarations: [MyPaymentsComponent],
})
export class MyPaymentsModule {}
