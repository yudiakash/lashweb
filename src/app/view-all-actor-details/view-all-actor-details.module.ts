import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ViewAllActorDetailsRoutingModule } from './view-all-actor-details-routing.module';
import { ViewAllActorDetailsComponent } from './view-all-actor-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, TranslateModule, ViewAllActorDetailsRoutingModule, ReactiveFormsModule, FormsModule],
  declarations: [ViewAllActorDetailsComponent],
})
export class ViewAllActorDetailsModule {}
