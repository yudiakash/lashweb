import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { RegistrationSuccessRoutingModule } from './registration-success-routing.module';
import { RegistrationSuccessComponent } from './registration-success.component';

@NgModule({
  imports: [CommonModule, TranslateModule, RegistrationSuccessRoutingModule],
  declarations: [RegistrationSuccessComponent],
})
export class RegistrationSuccessModule {}
