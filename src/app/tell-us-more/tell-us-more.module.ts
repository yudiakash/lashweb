import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { TellUsMoreRoutingModule } from './tell-us-more-routing.module';
import { TellUsMoreComponent } from './tell-us-more.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RegistrationRenewalModule } from '@app/registration-renewal/registration-renewal.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    TellUsMoreRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RegistrationRenewalModule,
  ],
  declarations: [TellUsMoreComponent],
})
export class TellUsMoreModule {}
