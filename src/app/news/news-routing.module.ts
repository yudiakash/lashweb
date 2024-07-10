import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { NewsComponent } from './news.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'news', component: NewsComponent, data: { title: marker('News') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class NewsRoutingModule {}
