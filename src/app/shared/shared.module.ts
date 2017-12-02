import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { KeysPipe } from './pipes';

const pipes = [
  KeysPipe
];

const providers = [

];

@NgModule({
  declarations: [
    ...pipes
  ],
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    ...pipes
  ],
  providers: [],
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ...providers
      ]
    };
  }

}
