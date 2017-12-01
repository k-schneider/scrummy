import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './not-found.page.html'
})
export class NotFoundPageComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
