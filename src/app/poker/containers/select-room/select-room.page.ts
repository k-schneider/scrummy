import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { State } from '../../../core/store';
import * as fromPokerRoom from '../../../core/store/poker-room';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './select-room.page.html'
})
export class SelectRoomPageComponent implements OnInit {
  constructor(private store: Store<State>) { }

  ngOnInit() { }

  get foo() {
    return this.store.select(fromPokerRoom.getPokerRoomState);
  }

  onMakeRoom() {
    this.store.dispatch(new fromPokerRoom.Create({
      name: 'A new room',
      players: {}
    }));
  }
}
