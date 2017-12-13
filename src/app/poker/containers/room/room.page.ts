import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { State } from '../../../core/store';
import * as fromPoker from '../../../core/store/poker';

@Component({
  selector: 'scr-room-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './room.page.html',
  styleUrls: ['room.page.scss']
})
export class RoomPageComponent implements OnInit, OnDestroy {
  joinError$: Observable<string>;
  joining$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.joinError$ = this.store.select(fromPoker.getJoinError);
    this.joining$ = this.store.select(fromPoker.getJoining);

    const roomId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new fromPoker.JoinRoom(roomId));
  }

  ngOnDestroy() {
    this.store.dispatch(new fromPoker.LeaveRoom());
  }
}
