import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { ViewAllActorDetailsComponent } from './view-all-actor-details.component';
const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'view-all-actor-details',
      component: ViewAllActorDetailsComponent,
      data: { title: marker('View All Details') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ViewAllActorDetailsRoutingModule {}
