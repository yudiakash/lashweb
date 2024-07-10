import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { TranzillaFailedPaymentComponent } from './tranzilla-failed-payment.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'tranzilla-failed-payment/:params',
      component: TranzillaFailedPaymentComponent,
      data: { title: marker('Tranzila Failed Payment') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TranzillaFailedPaymentRoutingModule {}
