import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { ActoraccountComponent } from './actoraccount.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'actor-account',
      component: ActoraccountComponent,
      data: { title: marker('Actor Account') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ActorAccountRoutingModule {}
