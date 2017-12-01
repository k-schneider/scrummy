import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '../../../core/store';
import * as fromPoker from '../../../core/store/poker';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'scr-make-room',
  templateUrl: './make-room.component.html',
  styleUrls: ['./make-room.component.scss']
})
export class MakeRoomComponent implements OnInit {
  roomName: string;

  constructor(private store: Store<State>) { }

  ngOnInit() { }

  onMakeRoom() {
    if (!this.roomName) {
      return;
    }

    this.store.dispatch(new fromPoker.CreateRoom({
      name: this.roomName,
      players: {}
    }));
  }
}
