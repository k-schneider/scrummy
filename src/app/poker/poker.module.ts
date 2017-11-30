import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';

import { PokerEffects } from '../core/store/poker';

import {
  RoomPageComponent,
  SelectRoomPageComponent
} from './containers';
import { PokerRoutingModule } from './poker-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([PokerEffects]),
    PokerRoutingModule
  ],
  declarations: [
    RoomPageComponent,
    SelectRoomPageComponent
  ],
  providers: []
})
export class PokerModule { }
