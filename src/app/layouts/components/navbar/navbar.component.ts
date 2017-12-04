import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { User } from '../../../core/models';
import { State } from '../../../core/store';
import * as fromAuth from '../../../core/store/auth';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'scr-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$: Observable<User>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.user$ = this.store.select(fromAuth.getUser);
  }
}
