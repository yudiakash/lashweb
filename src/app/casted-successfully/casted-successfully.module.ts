import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CastedSuccessfullyRoutingModule } from './casted-successfully-routing.module';
import { CastedSuccessfullyComponent } from './casted-successfully.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CastedSuccessfullyRoutingModule],
  declarations: [CastedSuccessfullyComponent],
})
export class CastedSuccessfullyModule {}
