import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { NewsDetailsRoutingModule } from './news-details-routing.module';
import { NewsDetailsComponent } from './news-details.component';

@NgModule({
  imports: [CommonModule, TranslateModule, NewsDetailsRoutingModule],
  declarations: [NewsDetailsComponent],
})
export class NewsDetailsModule {}
