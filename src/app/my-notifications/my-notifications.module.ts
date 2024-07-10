import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MyNotificationsRoutingModule } from './my-notifications-routing.module';
import { MyNotificationsComponent } from './my-notifications.component';
import { RegistrationRenewalModule } from '@app/registration-renewal/registration-renewal.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MyNotificationsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RegistrationRenewalModule,
  ],
  declarations: [MyNotificationsComponent],
})
export class MyNotificationsModule {}
