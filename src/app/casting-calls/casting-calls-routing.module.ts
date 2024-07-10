import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { CastingCallsComponent } from './casting-calls.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'casting-calls',
      component: CastingCallsComponent,
      data: { title: marker('Casting Calls') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CastingCallsRoutingModule {}
