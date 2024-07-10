import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { ResetPasswordComponent } from './reset-password.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'reset-password/:id', component: ResetPasswordComponent, data: { title: marker('Reset Password') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ResetPasswordRoutingModule {}
