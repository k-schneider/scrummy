import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/take';

import { Store } from '@ngrx/store';

import { PokerRoomState } from '../../../core/enums';
import { State } from '../../../core/store';
import * as fromAuth from '../../../core/store/auth';
import * as fromPoker from '../../../core/store/poker';
import { Observable } from 'rxjs/Observable';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'scr-make-room',
  templateUrl: './make-room.component.html'
})
export class MakeRoomComponent implements OnInit {
  error$: Observable<string>;
  form: FormGroup;
  hasSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.createForm();
    this.error$ = this.store.select(fromPoker.getCreateError);
  }

  onMakeRoom() {
    this.hasSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const name = this.form.get('name').value;
    this.store.select(fromAuth.getUser).take(1).subscribe(user => {
      this.store.dispatch(new fromPoker.CreateRoom({
        moderator: user.uid,
        name: name,
        state: PokerRoomState.Voting,
        cardValues: [0, 1, 2, 3, 5, 8, 13, 20, 40, 100, '?'], // todo: at some point make these customizable
      }));
    });
  }

  private createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }
}
