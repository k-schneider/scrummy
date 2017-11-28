import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { State } from '../../../core/store';
import * as fromPokerRoom from '../../../core/store/poker-room';

@Component({
  templateUrl: './room.page.html'
})
export class RoomPageComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>
  ) { }

  get foo() {
    return this.store.select(fromPokerRoom.getPokerRoomState);
  }

  ngOnInit() {
    const roomId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new fromPokerRoom.Join(roomId));
  }

  ngOnDestroy() {
    console.log('destroying!!!');
    this.store.dispatch(new fromPokerRoom.Leave());
  }
}
