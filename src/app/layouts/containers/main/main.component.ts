import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'scr-main',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
