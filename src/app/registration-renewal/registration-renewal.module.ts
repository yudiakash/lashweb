import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { RegistrationRenewalComponent } from './registration-renewal.component';
import { RegistrationRenewalRoutingModule } from './registration-renewal-routing.module';

@NgModule({
  imports: [CommonModule, TranslateModule, RegistrationRenewalRoutingModule],
  declarations: [RegistrationRenewalComponent],
  exports: [RegistrationRenewalComponent],
})
export class RegistrationRenewalModule {}
