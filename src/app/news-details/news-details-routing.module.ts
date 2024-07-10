import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { NewsDetailsComponent } from './news-details.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'news-details/:id',
      component: NewsDetailsComponent,
      data: { title: marker('News Details') },
    },
  ]),
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class NewsDetailsRoutingModule {}
