import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { PokerRoom } from '../../../core/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'scr-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  @Input() room: PokerRoom;

  constructor() { }

  ngOnInit() { }

  isNotNil(v) {
    return v !== undefined && v !== null;
  }
}
