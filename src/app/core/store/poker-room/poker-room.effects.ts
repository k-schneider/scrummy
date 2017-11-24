import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { PokerRoom } from '../../models';
import * as pokerRoomActions from './poker-room.actions';

import { switchMap, mergeMap, map } from 'rxjs/operators';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class PokerRoomEffects {

  constructor(private actions$: Actions, private afs: AngularFirestore) { }

  // somehow use this to track user online/offline?
  // this.afs.app.database().ref('/foo').onDisconnect().update({state: 'offline'});

  @Effect()
  query$: Observable<Action> = this.actions$.ofType(pokerRoomActions.QUERY).pipe(
    switchMap(action => {
      console.log(action);
      return this.afs.collection<PokerRoom>('poker-rooms', ref =>  {
        return ref.where('status', '==', 'open');
      })
      .stateChanges();
    }),
    mergeMap(actions =>  actions),
    map(action => {
      console.log('wee', action.payload.doc.data());
      return {
        type: `[PokerRoom] ${action.type}`,
        payload: {
          id: action.payload.doc.id,
          ...action.payload.doc.data()
        }
      };
    })
  );

  @Effect()
  create$: Observable<Action> = this.actions$.ofType(pokerRoomActions.CREATE).pipe(
    map((action: pokerRoomActions.Create) => action),
    switchMap(data => {
      return Observable.fromPromise(this.afs.collection<PokerRoom>(`poker-rooms`).add(data.payload));
    }),
    map(() => new pokerRoomActions.Success())
  );

  @Effect()
  update$: Observable<Action> = this.actions$.ofType(pokerRoomActions.UPDATE).pipe(
    map((action: pokerRoomActions.Update) => action),
    switchMap(data => {
      const ref = this.afs.doc<PokerRoom>(`poker-rooms/${data.id}`);
      return Observable.fromPromise(ref.update(data.changes));
    }),
    map(() => new pokerRoomActions.Success())
  );

  @Effect()
  delete$: Observable<Action> = this.actions$.ofType(pokerRoomActions.DELETE).pipe(
    map((action: pokerRoomActions.Delete) => action),
    switchMap(data => {
      const ref = this.afs.doc<PokerRoom>(`poker-rooms/${data.id}`);
      return Observable.fromPromise(ref.delete());
    }),
    map(() => new pokerRoomActions.Success())
  );

}
