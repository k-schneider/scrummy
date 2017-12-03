import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

import { Store } from '@ngrx/store';

import { PokerRoomState } from '../../../core/enums';
import { State } from '../../../core/store';
import * as fromAuth from '../../../core/store/auth';
import * as fromPoker from '../../../core/store/poker';
import { Observable } from 'rxjs/Observable';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'scr-make-room',
  templateUrl: './make-room.component.html',
  styleUrls: ['./make-room.component.scss']
})
export class MakeRoomComponent implements OnInit {
  error$: Observable<string>;
  roomName: string;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.error$ = this.store.select(fromPoker.getCreateError);
  }

  onMakeRoom() {
    if (!this.roomName) {
      return;
    }

    this.store.select(fromAuth.getUser).take(1).subscribe(user => {
      this.store.dispatch(new fromPoker.CreateRoom({
        moderator: user.uid,
        name: this.roomName,
        state: PokerRoomState.Voting,
        cardValues: [0, 1, 2, 3, 5, 8, 13, 20, 40, 100, '?'], // todo: at some point make these customizable
      }));
    });
  }
}
