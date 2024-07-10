import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { ForgotUsernameComponent } from './forgot-username.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'forgot-username', component: ForgotUsernameComponent, data: { title: marker('Forgot Username') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ForgotUsernameRoutingModule {}
