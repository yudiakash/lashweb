import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { ForgotPasswordComponent } from './forgot-password.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'forgot-password', component: ForgotPasswordComponent, data: { title: marker('Forgot Password') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ForgotPasswordRoutingModule {}
