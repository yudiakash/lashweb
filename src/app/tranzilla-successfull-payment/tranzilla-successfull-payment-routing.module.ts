import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { TranzillaSuccessfullPaymentComponent } from './tranzilla-successfull-payment.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'tranzilla-successfull-payment/:params',
      component: TranzillaSuccessfullPaymentComponent,
      data: { title: marker('Tranzila Successfull Payment') },
    },
    // {
    //   path: '**',
    //   component: TranzillaSuccessfullPaymentComponent,
    //   data: { title: marker('Tranzila Successfull Payment') },
    //   runGuardsAndResolvers: 'always',
    // },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TranzillaSuccessfullPaymentRoutingModule {}
