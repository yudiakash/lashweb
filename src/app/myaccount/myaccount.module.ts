import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MyaccountRoutingModule } from './myaccount-routing.module';
import { MyaccountComponent } from './myaccount.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RegistrationRenewalModule } from '@app/registration-renewal/registration-renewal.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MyaccountRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RegistrationRenewalModule,
  ],
  declarations: [MyaccountComponent],
  providers: [DatePipe],
})
export class MyaccountModule {}
