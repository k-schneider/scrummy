import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { State } from '../../core/store';
import * as fromAuth from '../../core/store/auth';
import { User } from '../../core/models';

@Component({
  selector: 'scr-login-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPageComponent implements OnInit {
  loading$: Observable<boolean>;
  name: string;
  user$: Observable<User>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.loading$ = this.store.select(fromAuth.getLoading);
    this.user$ = this.store.select(fromAuth.getUser);
    this.store.dispatch(new fromAuth.GetUser());
  }

  onContinue() {
    if (!this.name) {
      return;
    }
    this.store.dispatch(new fromAuth.SetDisplayName(this.name));
  }
}
