import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { WorkshopRegistration2Component } from './workshop-registration2.component';
const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'workshop-registration2',
      component: WorkshopRegistration2Component,
      data: { title: marker('Workshop Registration2') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class WorkshopRegistration2RoutingModule {}
