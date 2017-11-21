import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RootComponent } from './root';

export const components = [
  RootComponent
];

@NgModule({
  imports: [RouterModule],
  exports: [...components],
  declarations: [...components],
  providers: [],
})
export class LayoutsModule { }
