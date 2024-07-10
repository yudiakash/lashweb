import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetUsernameComponent } from './reset-username.component';
import { ResetUsernameRoutingModule } from './reset-username-routing.module';

@NgModule({
  imports: [CommonModule, TranslateModule, ResetUsernameRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [ResetUsernameComponent],
})
export class ResetUsernameModule {}
