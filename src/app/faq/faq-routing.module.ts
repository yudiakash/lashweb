import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { FaqComponent } from './faq.component';

const routes: Routes = [Shell.childRoutes([{ path: 'faq', component: FaqComponent, data: { title: marker('Faq') } }])];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class FaqRoutingModule {}
