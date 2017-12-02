import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';

import {
  MainComponent,
  NotFoundPageComponent
} from './containers';

export const components = [
  MainComponent,
  NotFoundPageComponent
];

@NgModule({
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [...components],
  declarations: [...components],
  providers: [],
})
export class LayoutsModule { }
