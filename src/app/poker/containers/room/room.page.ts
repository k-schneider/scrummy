import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { State } from '../../../core/store';
import * as fromPoker from '../../../core/store/poker';

@Component({
  templateUrl: './room.page.html'
})
export class RoomPageComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>
  ) { }

  get foo() {
    return this.store.select(fromPoker.getPokerState);
  }

  ngOnInit() {
    const roomId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new fromPoker.JoinRoom(roomId));
  }

  ngOnDestroy() {
    this.store.dispatch(new fromPoker.LeaveRoom());
  }
}
