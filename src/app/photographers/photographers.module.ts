import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { PhotographersRoutingModule } from './photographers-routing.module';
import { PhotographersComponent, ShortenUrlPipe } from './photographers.component';

@NgModule({
  imports: [CommonModule, TranslateModule, PhotographersRoutingModule],
  declarations: [PhotographersComponent, ShortenUrlPipe],
})
export class PhotographersModule {}
