import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';

import { PokerRoomEffects } from '../core/store/poker-room';

import {
  RoomPageComponent,
  SelectRoomPageComponent
} from './containers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'select-room',
    pathMatch: 'full'
  },
  {
    path: 'select-room',
    component: SelectRoomPageComponent
  },
  {
    path: 'room/:id',
    component: RoomPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([PokerRoomEffects])
  ],
  exports: [RouterModule]
})
export class PokerRoutingModule { }
