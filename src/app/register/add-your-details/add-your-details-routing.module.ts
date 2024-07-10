import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { AddYourDetailsComponent } from './add-your-details.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'add-your-details',
      component: AddYourDetailsComponent,
      data: { title: marker('Add Your Details') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AddYourDetailsRoutingModule {}
