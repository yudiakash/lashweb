import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { MyPaymentsComponent } from './my-payments.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'my-payments',
      component: MyPaymentsComponent,
      data: { title: marker('My Payments') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class MyPaymentsRoutingModule {}
