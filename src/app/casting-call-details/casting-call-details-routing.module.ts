import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { CastingCallDetailsComponent } from './casting-call-details.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'casting-call-details',
      component: CastingCallDetailsComponent,
      data: { title: marker('Casting Call Details') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CastingCallDetailsRoutingModule {}
