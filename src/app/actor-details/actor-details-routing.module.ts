import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { ActorDetailsComponent } from './actor-details.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'actor-details',
      component: ActorDetailsComponent,
      data: { title: marker('Actor Details') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ActorDetailsRoutingModule {}
