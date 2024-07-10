import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DirectorRegistrationSuccessComponent } from './director-registration-success.component';
import { DirectorRegistrationSuccessRoutingModule } from './director-regstration-success-routing.module';

@NgModule({
  imports: [CommonModule, TranslateModule, DirectorRegistrationSuccessRoutingModule, ReactiveFormsModule, FormsModule],
  declarations: [DirectorRegistrationSuccessComponent],
  providers: [DatePipe],
})
export class DirectorRegistrationSuccessModule {}
