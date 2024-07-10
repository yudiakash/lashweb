import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CastingCallsRoutingModule } from './casting-calls-routing.module';
import { CastingCallsComponent } from './casting-calls.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { DateagoPipe } from '../pipes/dateago.pipe';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CastingCallsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSliderModule,
  ],
  declarations: [CastingCallsComponent, DateagoPipe],
  exports: [],
})
export class CastingCallsModule {}
