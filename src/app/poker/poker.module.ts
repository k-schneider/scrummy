import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EffectsModule } from '@ngrx/effects';

import { PokerEffects } from '../core/store/poker';
import { SharedModule } from '../shared';

import {
  RoomPageComponent,
  SelectRoomPageComponent
} from './containers';

import {
  JoinErrorComponent,
  JoiningRoomComponent,
  JoinRoomComponent,
  MakeRoomComponent,
  ModeratorComponent,
  PlayerListComponent,
  PokerCardComponent,
  PokerRoomComponent,
  RoomInviteComponent,
  VoteResultsComponent
} from './components';

import {
  PokerRoomStatePipe
} from './pipes';

import { PokerRoutingModule } from './poker-routing.module';

const components = [
  // containers
  RoomPageComponent,
  SelectRoomPageComponent,
  // components
  JoinErrorComponent,
  JoiningRoomComponent,
  JoinRoomComponent,
  MakeRoomComponent,
  ModeratorComponent,
  PlayerListComponent,
  PokerCardComponent,
  PokerRoomComponent,
  RoomInviteComponent,
  VoteResultsComponent
];

const pipes = [
  PokerRoomStatePipe
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    NgxChartsModule,
    SharedModule,
    EffectsModule.forFeature([PokerEffects]),
    PokerRoutingModule
  ],
  declarations: [...components, ...pipes],
  providers: []
})
export class PokerModule { }
