import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { MyNotificationsComponent } from './my-notifications.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'my-notifications',
      component: MyNotificationsComponent,
      data: { title: marker('My Notifications') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class MyNotificationsRoutingModule {}
