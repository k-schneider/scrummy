import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';

import { AuthEffects } from '../core/store/auth';
import { AuthGuard } from './auth.guard';

import {
  LoginPageComponent
} from './containers';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [
    LoginPageComponent
  ],
  providers: [AuthGuard]
})
export class AuthModule { }
