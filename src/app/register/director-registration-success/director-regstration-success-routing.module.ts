import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { DirectorRegistrationSuccessComponent } from './director-registration-success.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'director-registration-success',
      component: DirectorRegistrationSuccessComponent,
      data: { title: marker('Director Registration Success') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class DirectorRegistrationSuccessRoutingModule {}
