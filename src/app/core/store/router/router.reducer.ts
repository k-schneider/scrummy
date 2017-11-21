import { Params } from '@angular/router';

import { routerReducer } from '@ngrx/router-store';

export interface State {
  url: string;
  queryParams: Params;
}

export const reducer = routerReducer;
