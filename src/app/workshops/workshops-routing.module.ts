import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { WorkshopsComponent } from './workshops.component';
const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'workshops',
      component: WorkshopsComponent,
      data: { title: marker('Workshops') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class WorkshopsRoutingModule {}
