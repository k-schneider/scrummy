import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'scr-poker-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './poker-card.component.html',
  styleUrls: ['./poker-card.component.scss']
})
export class PokerCardComponent implements OnInit {
  @Input() value: number | string;
  @Input() selected = false;
  @Output() select = new EventEmitter<number | string>();

  constructor() { }

  ngOnInit() { }

  onCardClick() {
    if (this.selected) {
      this.select.emit(null);
    } else {
      this.select.emit(this.value);
    }
  }
}
