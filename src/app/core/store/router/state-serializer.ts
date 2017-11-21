import { Params, RouterStateSnapshot } from '@angular/router';

import { RouterStateSerializer } from '@ngrx/router-store';

import { State } from './router.reducer';

export class CustomRouterStateSerializer implements RouterStateSerializer<State> {
  serialize(routerState: RouterStateSnapshot): State {
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;

    // Only return an object including the URL and query params
    // instead of the entire snapshot
    return { url, queryParams };
  }
}
