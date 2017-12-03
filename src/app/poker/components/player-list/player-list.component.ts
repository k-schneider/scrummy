import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { PokerRoomState } from '../../../core/enums';
import { PokerRoom } from '../../../core/models';
import { isNil } from '../../../core/utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'scr-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  @Input() room: PokerRoom;
  isNil = isNil;

  constructor() { }

  ngOnInit() { }

  get showVotes() {
    return this.room.state === PokerRoomState.Results;
  }
}
