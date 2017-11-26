import { PokerPlayer } from './poker-player.model';

export interface PokerRoom {
  id?: string;
  name: string;
  players: {
    [key: string]: PokerPlayer
  };
}
