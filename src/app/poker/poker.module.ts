import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  RoomPageComponent,
  SelectRoomPageComponent
} from './containers';
import { PokerRoutingModule } from './poker-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PokerRoutingModule
  ],
  declarations: [
    RoomPageComponent,
    SelectRoomPageComponent
  ],
  providers: []
})
export class PokerModule { }
