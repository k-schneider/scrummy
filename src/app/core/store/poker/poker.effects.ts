import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { AngularFireDatabase } from 'angularfire2/database';

import { PokerPlayer, PokerRoom } from '../../models';
import { getUser } from '../auth';
import * as routerActions from '../router/router.actions';
import { State } from '../index';
import * as pokerActions from './poker.actions';
import * as fromPoker from './poker.reducer';

@Injectable()
export class PokerEffects {

  constructor(
    private actions$: Actions,
    private afd: AngularFireDatabase,
    private store: Store<State>
  ) { }


  /**
   * Creates a new room in database and returns resulting key.
   */
  @Effect() createRoom$: Observable<Action> = this.actions$
    .ofType(pokerActions.CREATE_ROOM)
    .map((action: pokerActions.CreateRoom) => action)
    .switchMap(action => Observable.fromPromise(this.afd.list<PokerRoom>('/poker-rooms').push(action.pokerRoom)))
    .map(res => new pokerActions.CreateRoomSuccess(res.key))
    .catch(err => Observable.of(new pokerActions.CreateRoomFail(err)));


  /**
   * When a room has been successfully created then automatically navigate to it.
   */
  @Effect() createRoomSuccess$: Observable<Action> = this.actions$
    .ofType(pokerActions.CREATE_ROOM_SUCCESS)
    .map((action: pokerActions.CreateRoomSuccess) => action)
    .map(action => new routerActions.Go({
      path: ['/poker/room/' + action.pokerRoomId]
    }));


  /**
   * Starts the join room process by first pulling back current
   * room data and subscribing to room changes.
   */
  @Effect() joinRoom$: Observable<Action> = this.actions$
    .ofType(pokerActions.JOIN_ROOM)
    .map((action: pokerActions.JoinRoom) => action)
    .map(action => this.afd.object<PokerRoom>(`/poker-rooms/${action.pokerRoomId}`))
    .do(ref => {
      // listen for any changes to the poker room and
      // dispatch the modified event so store value can be updated
      // and stop when user leaves the room
      const leave$ = this.actions$.ofType(pokerActions.LEAVE_ROOM);
      ref.snapshotChanges().takeUntil(leave$).subscribe(data => {
        this.store.dispatch(new pokerActions.RoomModified(<PokerRoom>{
          id: data.key,
          ...data.payload.val()
        }));
      });
    })
    .switchMap(ref => ref.snapshotChanges().first())
    .map(data => {
      return new pokerActions.JoinRoomSuccess(<PokerRoom>{
        id: data.key,
        ...data.payload.val()
      });
    })
    .catch(err => Observable.of(new pokerActions.JoinRoomFail(err)));


  /**
   * After successfully joining a room we want to have 'presence' in this room.
   * As we connect/disconnect we want a player to be added/removed from the room.
   */
  @Effect() joinRoomSuccess$: Observable<Action> = this.actions$
    .ofType(pokerActions.JOIN_ROOM_SUCCESS)
    .map((action: pokerActions.JoinRoomSuccess) => action)
    .withLatestFrom(this.store)
    .map(([action, state]) => {
      // Get a reference to the specific player
      const roomPath = `/poker-rooms/${action.pokerRoom.id}`;
      const playerPath = `${roomPath}/players/${state.auth.user.uid}`;
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
            name: state.auth.user.displayName
          };
          playerRef.set(player);
        });

      });

      // store connectedSub in state so that off() can be called when leaving room
      return new pokerActions.RoomConnected({ connectionRef });
    });


  /**
   * Upon leaving we need to remove the player from the room and disconnect presence.
   */
  @Effect() leave$: Observable<Action> = this.actions$
    .ofType(pokerActions.LEAVE_ROOM)
    .withLatestFrom(this.store)
    .switchMap(([action, state]) => {
      const roomPath = `/poker-rooms/${state.poker.room.id}`;
      const playerPath = `${roomPath}/players/${state.auth.user.uid}`;
      const playerRef = this.afd.database.ref(playerPath);

      // remove the player and cancel any disconnect events
      return Observable.zip(
        Observable.of(state),
        Observable.fromPromise(playerRef.remove()),
        Observable.fromPromise(playerRef.onDisconnect().cancel()),
      );
    })
    .map(data => data[0])
    .map(state => {
      // stop monitoring connection for this room
      this.afd.database.ref('.info/connected').off('value', state.poker.connectionRef);
      return new pokerActions.LeaveRoomSuccess();
    });

  @Effect() vote$: Observable<Action> = this.actions$
    .ofType(pokerActions.VOTE)
    .map((action: pokerActions.Vote) => action)
    .withLatestFrom(this.store)
    .switchMap(([action, state]) => {
      const playerRef = this.afd.object<PokerPlayer>(`/poker-rooms/${state.poker.room.id}/players/${state.auth.user.uid}`);
      return Observable.fromPromise(playerRef.update({ vote: action.vote }));
    })
    .map(res => new pokerActions.VoteSuccess())
    .catch(err => Observable.of(new pokerActions.VoteFail(err)));
}
