import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { PokerRoom } from '../../../core/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'scr-vote-results',
  templateUrl: './vote-results.component.html'
})
export class VoteResultsComponent implements OnInit {
  @Input() room: PokerRoom;

  constructor() { }

  ngOnInit() { }
}
