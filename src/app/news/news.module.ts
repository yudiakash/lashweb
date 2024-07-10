import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { NgxMasonryModule } from 'ngx-masonry';

@NgModule({
  imports: [CommonModule, TranslateModule, NewsRoutingModule, NgxMasonryModule],
  declarations: [NewsComponent],
})
export class NewsModule {}
