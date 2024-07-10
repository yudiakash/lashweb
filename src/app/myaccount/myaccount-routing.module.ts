import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Shell } from '@app/shell/shell.service';
import { MyaccountComponent } from './myaccount.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'my-account-details',
      component: MyaccountComponent,
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class MyaccountRoutingModule {}
