import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { PhotographersComponent } from './photographers.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'our-top-photographers',
      component: PhotographersComponent,
      data: { title: marker('Our Top Photographers') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PhotographersRoutingModule {}
