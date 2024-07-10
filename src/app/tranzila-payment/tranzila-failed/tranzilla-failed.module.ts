import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RegistrationRenewalModule } from '@app/registration-renewal/registration-renewal.module';
import { TranzillaFailedRoutingModule } from './tranzilla-failed-routing.module';
import { TranzilaFailedComponent } from './tranzila-failed.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    TranzillaFailedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RegistrationRenewalModule,
  ],
  declarations: [TranzilaFailedComponent],
})
export class TranzillaFailedModule {}
