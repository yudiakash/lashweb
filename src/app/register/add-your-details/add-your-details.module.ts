import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { AddYourDetailsRoutingModule } from './add-your-details-routing.module';
import { AddYourDetailsComponent } from './add-your-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, TranslateModule, AddYourDetailsRoutingModule, ReactiveFormsModule, FormsModule],
  declarations: [AddYourDetailsComponent],
  providers: [DatePipe],
})
export class AddYourDetailsModule {}
