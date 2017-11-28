import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth) { }

  canActivate(): Observable<boolean> {
    return Observable.fromPromise(this.afAuth.auth.signInAnonymously()).map(() => true);
  }

}
