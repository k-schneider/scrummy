import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';

import { PokerEffects } from '../core/store/poker';
import { SharedModule } from '../shared';

import {
  RoomPageComponent,
  SelectRoomPageComponent
} from './containers';

import {
  JoinRoomComponent,
  MakeRoomComponent,
  PokerCardComponent,
  PokerRoomComponent
} from './components';

import { PokerRoutingModule } from './poker-routing.module';

const components = [
  // containers
  RoomPageComponent,
  SelectRoomPageComponent,
  // components
  JoinRoomComponent,
  MakeRoomComponent,
  PokerCardComponent,
  PokerRoomComponent
];

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    EffectsModule.forFeature([PokerEffects]),
    PokerRoutingModule
  ],
  declarations: [...components],
  providers: []
})
export class PokerModule { }
