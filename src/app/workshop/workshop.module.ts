import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { WorkshopComponent } from './workshop.component';
import { WorkshopRoutingModule } from './workshop-routing.module';

@NgModule({
  imports: [CommonModule, TranslateModule, WorkshopRoutingModule, ReactiveFormsModule, FormsModule],
  declarations: [WorkshopComponent],
})
export class WorkshopModule {}
