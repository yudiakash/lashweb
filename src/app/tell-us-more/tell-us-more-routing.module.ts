import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { TellUsMoreComponent } from './tell-us-more.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'tell-us-more',
      component: TellUsMoreComponent,
      data: { title: marker('Tell Us More') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TellUsMoreRoutingModule {}
