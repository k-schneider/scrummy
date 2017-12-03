import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { PokerRoomState } from '../../../core/enums';
import { PokerRoom } from '../../../core/models';
import { State } from '../../../core/store';
import * as fromPoker from '../../../core/store/poker';

@Component({
  selector: 'scr-moderator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './moderator.component.html'
})
export class ModeratorComponent implements OnInit {
  allPlayersVoted$: Observable<boolean>;
  room$: Observable<PokerRoom>;
  statesEnum = PokerRoomState;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.allPlayersVoted$ = this.store.select(fromPoker.getAllPlayersVoted);
    this.room$ = this.store.select(fromPoker.getPokerRoom);
  }

  onClearVotes() {
    this.store.dispatch(new fromPoker.ClearVotes());
  }

  onFlipCards() {
    this.store.dispatch(new fromPoker.FlipCards());
  }

  onResetRoom() {
    this.store.dispatch(new fromPoker.ResetRoom());
  }

}
