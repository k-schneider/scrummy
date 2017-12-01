import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';

import { AuthEffects } from '../core/store/auth';
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
    CommonModule,
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [...components],
  providers: [...providers]
})
export class AuthModule { }
