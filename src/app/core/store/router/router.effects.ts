import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Effect, Actions } from '@ngrx/effects';

import * as actions from './router.actions';

@Injectable()
export class RouterEffects {

  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(actions.GO)
    .map((action: actions.Go) => action.payload)
    .do(({ path, query: queryParams, extras}) =>
      this.router.navigate(path, { queryParams, ...extras }));

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.ofType(actions.BACK)
    .do(() => this.location.back());

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.ofType(actions.FORWARD)
    .do(() => this.location.forward());

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) { }
}
