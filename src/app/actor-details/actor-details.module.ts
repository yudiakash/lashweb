import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ActorDetailsRoutingModule } from '../actor-details/actor-details-routing.module';
import { ActorDetailsComponent } from '../actor-details/actor-details.component';
import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  imports: [CommonModule, TranslateModule, ActorDetailsRoutingModule, NgImageSliderModule],
  declarations: [ActorDetailsComponent],
})
export class ActorDetailsModule {}
