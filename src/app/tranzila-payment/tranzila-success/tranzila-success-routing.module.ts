import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { TranzilaSuccessComponent } from './tranzila-success.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'tranzilla-success',
      component: TranzilaSuccessComponent,
      data: { title: marker('Tranzila Success') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TranzillaSuccessRoutingModule {}
