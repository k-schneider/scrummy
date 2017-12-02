import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'scr-poker-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './poker-card.component.html',
  styleUrls: ['./poker-card.component.scss']
})
export class PokerCardComponent implements OnInit {
  @Input() value: number | string;
  @Output() select = new EventEmitter<number | string>();

  constructor() { }

  ngOnInit() { }
}
