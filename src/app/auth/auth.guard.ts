import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';


import { Store } from '@ngrx/store';

import { User } from '../core/models';
import { State } from '../core/store';
import * as fromAuth from '../core/store/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  user$: Observable<User>;

  constructor(private router: Router, private store: Store<State>) {
    this.user$ = this.store.select(fromAuth.getUser);
    this.store.dispatch(new fromAuth.GetUser());
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.user$
      .skipWhile(user => !user) // can do this because of anonymous auth
      .map(user => {
        if (user && user.displayName) {
          return true;
        }

        this.router.navigate(['/login'], { queryParams: { return_url: state.url }});
        return false;
      });
  }

}
