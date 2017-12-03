import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ObservableMedia } from '@angular/flex-layout';

import { isNil } from '../../../core/utils';
import { PokerRoom } from '../../../core/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'scr-vote-results',
  templateUrl: './vote-results.component.html',
  styleUrls: ['./vote-results.component.scss']
})
export class VoteResultsComponent implements OnInit, OnDestroy {
  @Input() room: PokerRoom;
  data: PieItem[];
  view: number[];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  mediaSub: Subscription;

  constructor(private media: ObservableMedia) { }

  ngOnInit() {
    this.initChartData();
    this.initChartSize();
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

  private initChartData() {
    this.data = [];

    for (const playerId in this.room.players) {
      if (this.room.players.hasOwnProperty(playerId)) {
        const player = this.room.players[playerId];
        if (isNil(player.vote)) {
          continue;
        }
        const name = '[' + player.vote.toString() + ']';
        const existing = this.data.find(d => d.name === name);
        if (existing) {
          existing.value++;
        } else {
          this.data.push({ name: name, value: 1 });
        }
      }
    }
  }

  private initChartSize() {
    // adjust the size of the chart as different media query points are hit
    this.mediaSub = this.media.subscribe(change => {
      switch (change.mqAlias) {
        case 'xl':
          this.view =  [900, 500];
          break;
        case 'lg':
          this.view =  [800, 500];
          break;
        case 'md':
          this.view = [500, 400];
          break;
        case 'sm':
          this.view = [500, 300];
          break;
        default:
          this.view = [350, 200];
          break;
      }
    });
  }
}

interface PieItem {
  name: string;
  value: number;
}
