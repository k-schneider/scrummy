import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { PokerPlayer, PokerRoom } from '../../models';
import { State } from '../index';
import * as pokerRoomActions from './poker-room.actions';
import * as fromPokerRoom from './poker-room.reducer';
import * as routerActions from '../router/router.actions';

@Injectable()
export class PokerRoomEffects {

  constructor(
    private actions$: Actions,
    private afs: AngularFirestore,
    private afd: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router,
    private store: Store<State>
  ) { }

  /**
   * Creates a new room in database and returns resulting key.
   */
  @Effect() create$: Observable<Action> = this.actions$
  .ofType(pokerRoomActions.CREATE)
  .map((action: pokerRoomActions.Create) => action)
  .switchMap(action => Observable.fromPromise(this.afd.list<PokerRoom>('/poker-rooms').push(action.payload)))
  .map(res => new pokerRoomActions.CreateSuccess(res.key))
  .catch(err => Observable.of(new pokerRoomActions.CreateFail({ error: err })));

  /**
   * When a room has been successfully created then automatically navigate to it.
   */
  @Effect() createSuccess$: Observable<Action> = this.actions$
  .ofType(pokerRoomActions.CREATE_SUCCESS)
  .map((action: pokerRoomActions.CreateSuccess) => action)
  .map(action => new routerActions.Go({
    path: ['/poker/room/' + action.payload]
  }));

  /**
   * Starts the join room process by first pulling back current
   * room data and subscribing to room changes.
   */
  @Effect() join$: Observable<Action> = this.actions$
  .ofType(pokerRoomActions.JOIN)
  .map((action: pokerRoomActions.Join) => action)
  .map(action => this.afd.object<PokerRoom>(`/poker-rooms/${action.payload}`))
  .do(ref => {
    // listen for any changes to the poker room and
    // dispatch the modified event so store value can be updated
    // and stop when user leaves the room
    const leave$ = this.actions$.ofType(pokerRoomActions.LEAVE);
    ref.snapshotChanges().takeUntil(leave$).subscribe(data => {
      this.store.dispatch(new pokerRoomActions.Modified(<PokerRoom>{
        id: data.key,
        ...data.payload.val()
      }));
    });
  })
  .switchMap(ref => ref.snapshotChanges().first())
  .map(data => {
    return new pokerRoomActions.JoinSuccess(<PokerRoom>{
      id: data.key,
      ...data.payload.val()
    });
  })
  .catch(err => Observable.of(new pokerRoomActions.JoinFail({ error: err })));

  /**
   * After successfully joining a room we want to have 'presence' in this room.
   * As we connect/disconnect we want a player to be added/removed from the room.
   */
  @Effect() joinSuccess$: Observable<Action> = this.actions$
  .ofType(pokerRoomActions.JOIN_SUCCESS)
  .map((action: pokerRoomActions.JoinSuccess) => action)
  .map(action => {
    const roomPath = `/poker-rooms/${action.payload.id}`;
    const playerPath = `${roomPath}/players/${this.afAuth.auth.currentUser.uid}`;
    const playerRef = this.afd.database.ref(playerPath);

    // Create a reference to the special '.info/connected' path in
    // Realtime Database. This path returns `true` when connected
    // and `false` when disconnected.
    const connectionRef = this.afd.database.ref('.info/connected').on('value', snapshot => {

      // If we're not currently connected, don't do anything.
      if (snapshot.val() === false) {
          return;
      }

      // If we are currently connected, then use the 'onDisconnect()'
      // method to register a remove which will only trigger once this
      // client has disconnected by closing the app,
      // losing internet, or any other means.
      playerRef.onDisconnect().remove().then(() => {
        // The promise returned from .onDisconnect().remove() will
        // resolve as soon as the server acknowledges the onDisconnect()
        // request, NOT once we've actually disconnected:
        // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

        // We can now safely add the player knowing that the
        // server will remove us once we lose connection.
        const player: PokerPlayer = {
          name: 'Joe Blow'
        };
        playerRef.set(player);
      });
    });

    // store connectedSub in state so that off() can be called when leaving room
    return new pokerRoomActions.RoomConnected({ connectionRef });
  });

  /**
   * Upon leaving we need to remove the player from the room and disconnect presence.
   */
  @Effect() leave$: Observable<Action> = this.actions$
  .ofType(pokerRoomActions.LEAVE)
  .withLatestFrom(this.store)
  .switchMap(([action, store]) => {
    const roomPath = `/poker-rooms/${store.pokerRoom.pokerRoom.id}`;
    const playerPath = `${roomPath}/players/${this.afAuth.auth.currentUser.uid}`;
    const playerRef = this.afd.database.ref(playerPath);

    // remove the player and cancel any disconnect events
    return Observable.zip(
      Observable.of(store),
      Observable.fromPromise(playerRef.remove()),
      Observable.fromPromise(playerRef.onDisconnect().cancel()),
    );
  })
  .map(data => data[0])
  .map(store => {
    // stop monitoring connection for this room
    this.afd.database.ref('.info/connected').off('value', store.pokerRoom.connectionRef);
    return new pokerRoomActions.LeaveSuccess();
  });

}
