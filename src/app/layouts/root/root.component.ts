import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'scr-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './root.component.html'
})
export class RootComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
