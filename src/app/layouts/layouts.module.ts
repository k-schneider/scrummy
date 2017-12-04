import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';

import {
  MainComponent,
  NotFoundPageComponent
} from './containers';

import {
  NavbarComponent
} from './components';

export const components = [
  // containers
  MainComponent,
  NotFoundPageComponent,
  // components
  NavbarComponent
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
