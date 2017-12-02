import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'scr-select-room',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './select-room.page.html',
  styleUrls: ['./select-room.page.scss']
})
export class SelectRoomPageComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
