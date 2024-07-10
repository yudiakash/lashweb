import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { WorkshopRegistrationComponent } from './workshop-registration.component';
import { WorkshopRegistrationRoutingModule } from './workshop-registration-routing.module';

@NgModule({
  imports: [CommonModule, TranslateModule, WorkshopRegistrationRoutingModule, ReactiveFormsModule, FormsModule],
  declarations: [WorkshopRegistrationComponent],
})
export class WorkshopRegistrationModule {}
