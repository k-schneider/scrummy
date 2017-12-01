import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from '../../models';
import { State } from '../index';
import * as routerActions from '../router/router.actions';
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private store: Store<State>
  ) { }

  /**
   * Gets the authenticated user or kicks of the anonymous login if they are not signed in.
   */
  @Effect() getUser$: Observable<Action> = this.actions$.ofType(authActions.GET_USER)
    .map((action: authActions.GetUser) => action)
    .switchMap(action => {
      return this.afAuth.authState.map(authData => {
        if (authData) {
          // User logged in
          const user: User = {
            uid: authData.uid,
            displayName: authData.displayName
          };
          return new authActions.Authenticated(user);
        } else {
          // User not logged in
          return new authActions.GoogleLogin();
        }
      })
      .catch(err =>  Observable.of(new authActions.AuthError()));
    });

  /**
   * Signs user in anonymously.
   */
  @Effect() login$:  Observable<Action> = this.actions$.ofType(authActions.GOOGLE_LOGIN)
    .map((action: authActions.GoogleLogin) => action)
    .switchMap(action => {
      return Observable.fromPromise(this.afAuth.auth.signInAnonymously())
        .map(credential => {
          // successful login
          return new authActions.GetUser();
        })
        .catch(err => Observable.of(new authActions.AuthError(err.message)));
    });

  /**
   * Sets the users display name in their profile.
   */
  @Effect() setDisplayName$: Observable<Action> = this.actions$.ofType(authActions.SET_DISPLAY_NAME)
    .map((action: authActions.SetDisplayName) => action)
    .switchMap(action => {
      return Observable.fromPromise(this.afAuth.auth.currentUser.updateProfile({ displayName: action.displayName, photoURL: null }))
        .map(() => new authActions.SetDisplayNameSuccess(this.afAuth.auth.currentUser.displayName))
        .catch(err => Observable.of(new authActions.AuthError(err.message)));
    });

  /**
   * Profile was updated so navigate to either return url in the current route or home.
   */
  @Effect() setDisplayNameSuccess$: Observable<Action> = this.actions$.ofType(authActions.SET_DISPLAY_NAME_SUCCESS)
    .map((action: authActions.SetDisplayNameSuccess) => action)
    .withLatestFrom(this.store)
    .map(([action, state]) => {
      const dest = state.router.state.queryParams.return_url || '/';
      return new routerActions.Go({
        path: [dest]
      });
    });

}
