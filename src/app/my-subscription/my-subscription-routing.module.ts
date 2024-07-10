import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { MySubscriptionComponent } from './my-subscription.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'my-subscription',
      component: MySubscriptionComponent,
      data: { title: marker('My Subscription') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class MySubscriptionRoutingModule {}
