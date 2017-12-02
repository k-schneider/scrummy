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
  room$: Observable<PokerRoom>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.room$ = this.store.select(fromPoker.getPokerRoom);
  }

  onClearVotes() {
    this.store.dispatch(new fromPoker.ClearVotes());
  }

  onFlipCards() {
    alert('todo');
  }

  onVote(value: number | string) {
    this.store.dispatch(new fromPoker.Vote(value));
  }

}
