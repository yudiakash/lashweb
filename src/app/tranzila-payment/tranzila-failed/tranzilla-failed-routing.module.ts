import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { TranzilaFailedComponent } from './tranzila-failed.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'tranzilla-failed',
      component: TranzilaFailedComponent,
      data: { title: marker('Tranzila Failed') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TranzillaFailedRoutingModule {}
