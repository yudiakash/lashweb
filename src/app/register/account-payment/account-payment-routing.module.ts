import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { AccountPaymentComponent } from './account-payment.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'account-payment',
      component: AccountPaymentComponent,
      data: { title: marker('Subscriptions') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AccountPaymentRoutingModule {}
