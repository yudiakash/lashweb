import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { RehearsalsStudiosComponent } from './rehearsals-studios.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'rehearsals-studios',
      component: RehearsalsStudiosComponent,
      data: { title: marker('Rehearsals Studios') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class RehearsalsStudiosRoutingModule {}
