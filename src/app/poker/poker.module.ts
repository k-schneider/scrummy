import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';

import { PokerEffects } from '../core/store/poker';

import {
  RoomPageComponent,
  SelectRoomPageComponent
} from './containers';

import {
  JoinRoomComponent,
  MakeRoomComponent
} from './components';

import { PokerRoutingModule } from './poker-routing.module';

const components = [
  RoomPageComponent,
  SelectRoomPageComponent,

  JoinRoomComponent,
  MakeRoomComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EffectsModule.forFeature([PokerEffects]),
    PokerRoutingModule
  ],
  declarations: [...components],
  providers: []
})
export class PokerModule { }
