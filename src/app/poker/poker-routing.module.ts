import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokerRoutingModule { }
