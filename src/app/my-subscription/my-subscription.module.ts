import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MySubscriptionRoutingModule } from './my-subscription-routing.module';
import { MySubscriptionComponent } from './my-subscription.component';
import { RegistrationRenewalModule } from '@app/registration-renewal/registration-renewal.module';

@NgModule({
  imports: [CommonModule, TranslateModule, MySubscriptionRoutingModule, RegistrationRenewalModule],
  declarations: [MySubscriptionComponent],
})
export class MySubscriptionModule {}
