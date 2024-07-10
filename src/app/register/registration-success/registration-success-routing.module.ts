import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { RegistrationSuccessComponent } from './registration-success.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'registration-success',
      component: RegistrationSuccessComponent,
      data: { title: marker('Registration Successfull') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class RegistrationSuccessRoutingModule {}
