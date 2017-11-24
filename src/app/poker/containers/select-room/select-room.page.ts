import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { State, getCounterValue } from '../../../core/store';
import { DecrementAction, IncrementAction, OverrideAction } from '../../../core/store/counter';

import { PokerRoom } from '../../../core/models';
import * as fromPokerRoom from '../../../core/store/poker-room';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './select-room.page.html'
})
export class SelectRoomPageComponent implements OnInit {
  counter$: Observable<number>;
  pokerRooms$: Observable<PokerRoom[]>;

  constructor(private store: Store<State>) {
    this.counter$ = store.select(getCounterValue);
  }

  ngOnInit() {
    this.pokerRooms$ = this.store.select(fromPokerRoom.selectAll);
    this.store.dispatch(new fromPokerRoom.Query());
  }

  onDecrement() {
    this.store.dispatch(new DecrementAction());
  }

  onIncrement() {
    this.store.dispatch(new IncrementAction());
  }

  onReset() {
    this.store.dispatch(new OverrideAction(0));
  }

  // -----

  onUpdateRoom(room: PokerRoom) {
    this.store.dispatch(new fromPokerRoom.Update(room.id, { name: room.name + '_zzz' }));
  }

  onDeleteRoom(room: PokerRoom) {
    this.store.dispatch(new fromPokerRoom.Delete(room.id));
  }

  onMakeRoom() {
    this.store.dispatch(new fromPokerRoom.Create({ name: 'A new room', status: 'open' }));
  }
}
