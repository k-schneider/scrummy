import { PokerPlayer } from './poker-player.model';
import { PokerRoomState } from '../enums/index';

export interface PokerRoom {
  id?: string;
  moderator: string;
  name: string;
  state: PokerRoomState;
  cardValues: (string | number)[];
  players: {
    [key: string]: PokerPlayer
  };
}
