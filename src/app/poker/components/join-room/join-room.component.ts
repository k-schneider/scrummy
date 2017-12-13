import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'scr-join-room',
  templateUrl: './join-room.component.html'
})
export class JoinRoomComponent implements OnInit {
  form: FormGroup;
  hasSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  onJoinRoom() {
    this.hasSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const roomId = this.form.get('roomId').value;
    this.router.navigate(['/poker/room', roomId]);
  }

  private createForm() {
    this.form = this.fb.group({
      roomId: ['', Validators.required]
    });
  }
}
