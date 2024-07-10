import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { WorkshopRegistration3Component } from './workshop-registration3.component';
import { WorkshopRegistration3RoutingModule } from './workshop-registration3-routing.module';

@NgModule({
  imports: [CommonModule, TranslateModule, WorkshopRegistration3RoutingModule, ReactiveFormsModule, FormsModule],
  declarations: [WorkshopRegistration3Component],
})
export class WorkshopRegistration3Module {}
