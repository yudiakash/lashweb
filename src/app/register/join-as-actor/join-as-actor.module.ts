import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { JoinAsActorRoutingModule } from './join-as-actor-routing.module';
import { JoinAsActorComponent } from './join-as-actor.component';

@NgModule({
  imports: [CommonModule, TranslateModule, JoinAsActorRoutingModule],
  declarations: [JoinAsActorComponent],
})
export class JoinAsActorModule {}
