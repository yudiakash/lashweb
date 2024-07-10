import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { MyMessagesComponent } from './my-messages.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'my-messages',
      component: MyMessagesComponent,
      data: { title: marker('My Messages') },
    },
    {
      path: 'my-messages/:id',
      component: MyMessagesComponent,
      data: { title: marker('My Messages') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class MyMessagesRoutingModule {}
