import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotUsernameRoutingModule } from './forgot-username-routing.module';
import { ForgotUsernameComponent } from './forgot-username.component';

@NgModule({
  imports: [CommonModule, TranslateModule, ForgotUsernameRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [ForgotUsernameComponent],
})
export class ForgotUsernameModule {}
