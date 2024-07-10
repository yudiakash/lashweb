import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { WorkshopRegistrationComponent } from './workshop-registration.component';
const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'workshop-registration/:id',
      component: WorkshopRegistrationComponent,
      data: { title: marker('Workshop Registration') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class WorkshopRegistrationRoutingModule {}
