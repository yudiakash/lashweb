import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { WorkshopRegistration3Component } from './workshop-registration3.component';
const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'workshop-registration3',
      component: WorkshopRegistration3Component,
      data: { title: marker('Workshop Registration3') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class WorkshopRegistration3RoutingModule {}
