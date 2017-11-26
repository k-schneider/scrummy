import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { PokerRoom } from '../../models';
import * as pokerRoomActions from './poker-room.actions';

import { switchMap, mergeMap, map } from 'rxjs/operators';
import 'rxjs/add/observable/fromPromise';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class PokerRoomEffects {

  constructor(private actions$: Actions, private afs: AngularFirestore) { }

  // somehow use this to track user online/offline?
  // this.afs.app.database().ref('/foo').onDisconnect().update({state: 'offline'});

  @Effect()
  create$: Observable<Action> = this.actions$.ofType(pokerRoomActions.CREATE).pipe(
    map((action: pokerRoomActions.Create) => action),
    switchMap(data => {
      return Observable.fromPromise(this.afs.collection<PokerRoom>(`poker-rooms`).add(data.payload));
    }),
    map(() => new pokerRoomActions.CreateSuccess()),
    catchError(err => of(new pokerRoomActions.CreateFail({ error: err })))
  );

  @Effect()
  join$: Observable<Action> = this.actions$.ofType(pokerRoomActions.JOIN).pipe(
    map((action: pokerRoomActions.Join) => action.payload),
    switchMap((id: string) => {
      console.log('getting poker room', {id: id });
      return this.afs.doc<PokerRoom>(`poker-rooms/${id}`).valueChanges();
    }),
    map(pokerRoom => new pokerRoomActions.JoinSuccess(pokerRoom)),
    catchError(err => of(new pokerRoomActions.JoinFail({ error: err })))
  );

}
