import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { ResetUsernameComponent } from './reset-username.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'reset-username/:id', component: ResetUsernameComponent, data: { title: marker('Reset Username') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ResetUsernameRoutingModule {}
