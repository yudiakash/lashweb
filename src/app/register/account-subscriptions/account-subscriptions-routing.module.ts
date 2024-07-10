import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { AccountSubscriptionsComponent } from './account-subscriptions.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'account-subscriptions',
      component: AccountSubscriptionsComponent,
      data: { title: marker('Subscriptions') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AccountSubscriptionsRoutingModule {}
