import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { RehearsalsStudiosRoutingModule } from '../rehearsals-studios/rehearsals-studios-routing.module';
import { RehearsalsStudiosComponent } from '../rehearsals-studios/rehearsals-studios.component';

@NgModule({
  imports: [CommonModule, TranslateModule, RehearsalsStudiosRoutingModule],
  declarations: [RehearsalsStudiosComponent],
})
export class RehearsalsStudiosModule {}
