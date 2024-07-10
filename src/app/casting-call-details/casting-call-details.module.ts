import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CastingCallDetailsRoutingModule } from './casting-call-details-routing.module';
import { CastingCallDetailsComponent } from './casting-call-details.component';
import { DateagoPipe } from '../pipes/dateago.pipe';

@NgModule({
  imports: [CommonModule, TranslateModule, CastingCallDetailsRoutingModule],
  declarations: [CastingCallDetailsComponent],
})
export class CastingCallDetailsModule {}
