import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RegistrationRenewalModule } from '@app/registration-renewal/registration-renewal.module';
import { TranzillaSuccessRoutingModule } from './tranzila-success-routing.module';
import { TranzilaSuccessComponent } from './tranzila-success.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    TranzillaSuccessRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RegistrationRenewalModule,
  ],
  declarations: [TranzilaSuccessComponent],
})
export class TranzillaSuccessModule {}
