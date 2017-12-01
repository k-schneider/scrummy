import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'scr-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent implements OnInit {
  roomId: string;

  constructor(private router: Router) { }

  ngOnInit() { }

  onJoinRoom() {
    if (!this.roomId) {
      return;
    }
    this.router.navigate(['/poker/room', this.roomId]);
  }
}
