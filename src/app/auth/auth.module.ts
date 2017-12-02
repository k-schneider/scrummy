import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';

import { AuthEffects } from '../core/store/auth';
import { SharedModule } from '../shared';
import { AuthGuard } from './auth.guard';

import {
  LoginPageComponent
} from './containers';

const components = [
  LoginPageComponent
];

const providers = [
  AuthGuard
];

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [...components]
})
export class AuthModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        ...providers
      ]
    };
  }

}
