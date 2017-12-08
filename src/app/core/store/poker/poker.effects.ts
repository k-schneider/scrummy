import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
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

import { PokerRoomState } from '../../enums';
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
    .switchMap(action => {
      return Observable.fromPromise(this.afd.list<PokerRoom>('/poker-rooms').push(action.pokerRoom))
        .map(res => new pokerActions.CreateRoomSuccess(res.key))
        .catch(err => Observable.of(new pokerActions.CreateRoomFail(err.message)));
    });


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
      const sub = ref.snapshotChanges().takeUntil(leave$).subscribe(data => {
        if (!data.key) {
          // bad room id
          sub.unsubscribe();
        }

        this.store.dispatch(new pokerActions.RoomModified(<PokerRoom>{
          id: data.key,
          ...data.payload.val()
        }));
      });
    })
    .switchMap(ref => {
      return ref.snapshotChanges().first()
        .map(data => {
          if (!data.key) {
            // bad room id
            throw Error(`Room not found!`);
          }
          return new pokerActions.JoinRoomSuccess(<PokerRoom>{
            id: data.key,
            ...data.payload.val()
          });
        })
        .catch(err => Observable.of(new pokerActions.JoinRoomFail(err.message)));
    });


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
      const player: PokerPlayer = {
        name: state.auth.user.displayName
      };

      let disconnectAdded = false;

      // Create a reference to the special '.info/connected' path in
      // Realtime Database. This path returns `true` when connected
      // and `false` when disconnected.
      const onConnectedChanged = this.afd.database.ref('.info/connected').on('value', async connSnapshot => {

        // If we're not currently connected, don't do anything.
        if (connSnapshot.val() === false) {
          return;
        }

        // If we are currently connected, then use the 'onDisconnect()'
        // method to register a remove which will only trigger once this
        // client has disconnected by closing the app,
        // losing internet, or any other means.
        await playerRef.onDisconnect().remove();

        // The promise returned from .onDisconnect().remove() will
        // resolve as soon as the server acknowledges the onDisconnect()
        // request, NOT once we've actually disconnected:
        // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect
        await playerRef.set(Object.assign({}, player));

        disconnectAdded = true;
      });

      // We can now safely add the player knowing that the
      // server will remove us once we lose connection.
      const onPlayerChanged = playerRef.on('value', playerSnapshot => {
        // ensure a player is always present - this will prevent the same user in a different browser removing the player
        if (disconnectAdded && playerSnapshot.val() === null) {
          playerRef.set(Object.assign({}, player));
        }
      });
      return { onConnectedChanged, onPlayerChanged };
    }).map((res: any) => new pokerActions.RoomConnected(res));


  /**
   * Update the players vote in database.
   */
  @Effect() vote$: Observable<Action> = this.actions$
    .ofType(pokerActions.VOTE)
    .map((action: pokerActions.Vote) => action)
    .withLatestFrom(this.store)
    .switchMap(([action, state]) => {
      const playerRef = this.afd.object<PokerPlayer>(`/poker-rooms/${state.poker.room.id}/players/${state.auth.user.uid}`);
      return Observable.fromPromise(playerRef.update({ vote: action.vote }))
        .map(res => new pokerActions.VoteSuccess())
        .catch(err => Observable.of(new pokerActions.VoteFail(err.message)));
    });


  /**
   * Clear all votes in database.
   */
  @Effect() clearVotes$ = this.actions$
    .ofType(pokerActions.CLEAR_VOTES)
    .map((action: pokerActions.ClearVotes) => action)
    .withLatestFrom(this.store)
    .switchMap(([action, state]) => {
      return this.clearVotes(state.poker.room.id)
        .map(res => new pokerActions.ClearVotesSuccess())
        .catch(err => Observable.of(new pokerActions.ClearVotesFail(err.message)));
    });

  /**
   * Transition the room state to 'Results'.
   */
  @Effect() flipCards$ = this.actions$
    .ofType(pokerActions.FLIP_CARDS)
    .map((action: pokerActions.FlipCards) => action)
    .withLatestFrom(this.store)
    .switchMap(([action, state]) => {
      const roomRef = this.afd.object<PokerRoom>(`/poker-rooms/${state.poker.room.id}`);
      return Observable.fromPromise(roomRef.update({ state: PokerRoomState.Results }))
        .map(res => new pokerActions.FlipCardsSuccess())
        .catch(err => Observable.of(new pokerActions.FlipCardsFail(err.message)));
    });

  /**
   * Reset room back to initial state in database.
   */
  @Effect() resetRoom$ = this.actions$
    .ofType(pokerActions.RESET_ROOM)
    .map((action: pokerActions.ResetRoom) => action)
    .withLatestFrom(this.store)
    .switchMap(([action, state]) => {
      const roomRef = this.afd.object<PokerRoom>(`/poker-rooms/${state.poker.room.id}`);
      return this.clearVotes(state.poker.room.id)
        .switchMap(() => Observable.fromPromise(roomRef.update({ state: PokerRoomState.Voting })))
        .map(() => new pokerActions.ResetRoomSuccess())
        .catch(err => Observable.of(new pokerActions.ResetRoomFail(err.message)));
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
    playerRef.off('value', state.poker.onPlayerChanged); // remove this so player isn't just added right back

    // remove the player and cancel any disconnect events
    return Observable.zip(
      Observable.fromPromise(playerRef.remove()),
      Observable.fromPromise(playerRef.onDisconnect().cancel()),
    ).map(() => {
      // stop monitoring connection for this room
      this.afd.database.ref('.info/connected').off('value', state.poker.onConnectedChanged);
      return new pokerActions.LeaveRoomSuccess();
    });
  });

  /**
   * Clears all votes for the specified room
   */
  private clearVotes(roomId): Observable<any> {
    const playersRef = this.afd.database.ref(`/poker-rooms/${roomId}/players`);
    // iterate over all players and build a set of updates to perform
    return Observable.fromPromise(playersRef.once('value', snapshot => {
      const updates: any = {};
      snapshot.forEach(player => {
        updates[`${player.key}/vote`] = null;
        return false; // false means keep iterating, we want to go through all players
      });
      return playersRef.update(updates); // send updates to firebase
    }));
  }
}
