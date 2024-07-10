import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { WorkshopComponent } from './workshop.component';
const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'workshop/:id',
      component: WorkshopComponent,
      data: { title: marker('Workshop') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class WorkshopRoutingModule {}
