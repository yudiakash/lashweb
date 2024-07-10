import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { TermsOfUseRoutingModule } from './terms-of-use-routing.module';
import { TermsOfUseComponent } from './terms-of-use.component';

@NgModule({
  imports: [CommonModule, TranslateModule, TermsOfUseRoutingModule],
  declarations: [TermsOfUseComponent],
})
export class TermsOfUseModule {}
