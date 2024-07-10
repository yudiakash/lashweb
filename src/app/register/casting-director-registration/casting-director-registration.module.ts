import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CastingDirectorRegistrationComponent } from './casting-director-registration.component';
import { CastingDirectorRegistrationRoutingModule } from './casting-director-registration-routing.module';

@NgModule({
  imports: [CommonModule, TranslateModule, CastingDirectorRegistrationRoutingModule, ReactiveFormsModule, FormsModule],
  declarations: [CastingDirectorRegistrationComponent],
  providers: [DatePipe],
})
export class CastingDirectorRegistrationModule {}
