import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, LoginPageComponent } from './auth';
import { NotFoundPageComponent } from './layouts';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'poker',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'poker',
    loadChildren: 'app/poker/poker.module#PokerModule',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
