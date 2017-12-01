import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  MainComponent,
  NotFoundPageComponent
} from './containers';

export const components = [
  MainComponent,
  NotFoundPageComponent
];

@NgModule({
  imports: [RouterModule],
  exports: [...components],
  declarations: [...components],
  providers: [],
})
export class LayoutsModule { }
