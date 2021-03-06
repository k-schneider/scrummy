import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { PokerRoomState } from '../../../core/enums';
import { PokerRoom } from '../../../core/models';
import { State } from '../../../core/store';
import * as fromPoker from '../../../core/store/poker';

@Component({
  selector: 'scr-poker-room',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './poker-room.component.html'
})
export class PokerRoomComponent implements OnInit {
  isModerator$: Observable<boolean>;
  room$: Observable<PokerRoom>;
  statesEnum = PokerRoomState;
  vote$: Observable<string | number>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.isModerator$ = this.store.select(fromPoker.getIsModerator);
    this.room$ = this.store.select(fromPoker.getPokerRoom);
    this.vote$ = this.store.select(fromPoker.getVote);
  }

  onVote(value: number | string) {
    this.store.dispatch(new fromPoker.Vote(value));
  }

}
