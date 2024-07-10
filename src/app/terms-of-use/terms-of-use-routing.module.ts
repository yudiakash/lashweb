import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { TermsOfUseComponent } from './terms-of-use.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'terms-of-use', component: TermsOfUseComponent, data: { title: marker('Terms Of Use') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TermsOfUseRoutingModule {}
