import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    public angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
  ) {}
}
