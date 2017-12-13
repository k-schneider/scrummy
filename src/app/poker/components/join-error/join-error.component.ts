import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'scr-join-error',
  templateUrl: './join-error.component.html',
  styleUrls: ['join-error.component.scss']
})
export class JoinErrorComponent implements OnInit {
  @Input() error: string;

  constructor() { }

  ngOnInit() { }
}
