import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { WorkshopRegistration2Component } from './workshop-registration2.component';
import { WorkshopRegistration2RoutingModule } from './workshop-registration2-routing.module';

@NgModule({
  imports: [CommonModule, TranslateModule, WorkshopRegistration2RoutingModule, ReactiveFormsModule, FormsModule],
  declarations: [WorkshopRegistration2Component],
})
export class WorkshopRegistration2Module {}
