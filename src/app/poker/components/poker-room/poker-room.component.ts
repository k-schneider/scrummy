import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { PokerRoom } from '../../../core/models';
import { State } from '../../../core/store';
import * as fromPoker from '../../../core/store/poker';

@Component({
  selector: 'scr-poker-room',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './poker-room.component.html'
})
export class PokerRoomComponent implements OnInit {
  cardValues = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100, '?']; // todo: these should come from room
  room$: Observable<PokerRoom>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.room$ = this.store.select(fromPoker.getPokerRoom);
  }

  onVote(value: number | string) {
    this.store.dispatch(new fromPoker.Vote(value));
  }
}
