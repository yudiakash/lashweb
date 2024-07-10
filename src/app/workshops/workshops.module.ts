import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { WorkshopsComponent } from './workshops.component';
import { WorkshopsRoutingModule } from './workshops-routing.module';

@NgModule({
  imports: [CommonModule, TranslateModule, WorkshopsRoutingModule, ReactiveFormsModule, FormsModule],
  declarations: [WorkshopsComponent],
})
export class WorkshopsModule {}
