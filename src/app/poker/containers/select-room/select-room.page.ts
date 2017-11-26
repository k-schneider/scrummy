import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { State } from '../../../core/store';
import { PokerRoom } from '../../../core/models';
import * as fromPokerRoom from '../../../core/store/poker-room';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './select-room.page.html'
})
export class SelectRoomPageComponent implements OnInit {
  constructor(private store: Store<State>) { }

  ngOnInit() { }

  onMakeRoom() {
    this.store.dispatch(new fromPokerRoom.Create({
      name: 'A new room',
      players: {}
    }));
  }

  onJoinRoom() {
    this.store.dispatch(new fromPokerRoom.Join('muRzca6WS6xKHdTgOdfW'));
  }
}
