import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { State, getCounterValue } from '../../../core/store';
import { DecrementAction, IncrementAction, OverrideAction } from '../../../core/store/counter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './select-room.page.html'
})
export class SelectRoomPageComponent implements OnInit {
  counter$: Observable<number>;

  constructor(private store: Store<State>) {
    this.counter$ = store.select(getCounterValue);
  }

  ngOnInit() { }

  onDecrement() {
    this.store.dispatch(new DecrementAction());
  }

  onIncrement() {
    this.store.dispatch(new IncrementAction());
  }

  onReset() {
    this.store.dispatch(new OverrideAction(0));
  }
}
