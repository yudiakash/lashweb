import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyMessagesRoutingModule } from './my-messages-routing.module';
import { MyMessagesComponent } from './my-messages.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RegistrationRenewalModule } from '@app/registration-renewal/registration-renewal.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MyMessagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RegistrationRenewalModule,
  ],
  declarations: [MyMessagesComponent],
})
export class MyMessagesModule {}
