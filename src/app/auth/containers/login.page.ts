import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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
export class LoginPageComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  name: string;
  user$: Observable<User>;
  private userSub: Subscription;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.loading$ = this.store.select(fromAuth.getLoading);
    this.user$ = this.store.select(fromAuth.getUser);
    this.store.dispatch(new fromAuth.GetUser());

    // get the current user if there is one so we can pre-populate name
    this.userSub = this.user$.subscribe(user => {
      if (user) {
        this.name = user.displayName;
      }
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  onContinue() {
    if (!this.name) {
      return;
    }
    this.store.dispatch(new fromAuth.SetDisplayName(this.name));
  }
}
