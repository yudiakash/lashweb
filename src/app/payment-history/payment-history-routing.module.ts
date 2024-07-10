import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { PaymentHistoryComponent } from './payment-history.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'payment-history', component: PaymentHistoryComponent, data: { title: marker('Payment History') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PaymentHistoryRoutingModule {}
