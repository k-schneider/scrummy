import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { PokerRoom } from '../../../core/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'scr-room-invite',
  templateUrl: './room-invite.component.html'
})
export class RoomInviteComponent implements OnInit {
  @Input() room: PokerRoom;
  link: string;

  constructor() { }

  ngOnInit() {
    this.link = window.location.href; // todo: check platform for universal
  }
}
