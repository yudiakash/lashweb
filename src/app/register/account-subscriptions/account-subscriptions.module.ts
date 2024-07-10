import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { AccountSubscriptionsRoutingModule } from './account-subscriptions-routing.module';
import { AccountSubscriptionsComponent } from './account-subscriptions.component';

@NgModule({
  imports: [CommonModule, TranslateModule, AccountSubscriptionsRoutingModule],
  declarations: [AccountSubscriptionsComponent],
})
export class AccountSubscriptionsModule {}
