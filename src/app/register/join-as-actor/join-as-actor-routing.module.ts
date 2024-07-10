import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { JoinAsActorComponent } from './join-as-actor.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'join-as-actor',
      component: JoinAsActorComponent,
      data: { title: marker('Join As Actor') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class JoinAsActorRoutingModule {}
