import { Pipe, PipeTransform } from '@angular/core';
import { PokerRoomState } from '../../core/enums/index';

@Pipe({name: 'pokerRoomState'})
export class PokerRoomStatePipe implements PipeTransform {
  transform(value: PokerRoomState): any {
    switch (value) {
      case PokerRoomState.Results: {
        return 'Showing Results';
      }
      case PokerRoomState.Voting: {
        return 'Voting';
      }
      default: {
        return '';
      }
    }
  }
}
