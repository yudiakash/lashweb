import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { CastedSuccessfullyComponent } from './casted-successfully.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'casted-successfully',
      component: CastedSuccessfullyComponent,
      data: { title: marker('Casted Successfully') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CastedSuccessfullyRoutingModule {}
