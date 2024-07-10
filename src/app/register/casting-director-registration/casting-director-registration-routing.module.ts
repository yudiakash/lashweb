import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { CastingDirectorRegistrationComponent } from './casting-director-registration.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'director-registration',
      component: CastingDirectorRegistrationComponent,
      data: { title: marker('Director Registration') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CastingDirectorRegistrationRoutingModule {}
