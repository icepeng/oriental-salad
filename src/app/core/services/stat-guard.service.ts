import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import * as StatAction from '../actions/stat';
import * as fromRoot from '../../reducers';

@Injectable()
export class StatGuard implements CanActivate {
  constructor(private store: Store<fromRoot.State>) {}

  getFromStoreOrAPI() {
    return this.store.select(fromRoot.getStatList).pipe(
      tap((statList: any) => {
        if (!statList) {
          this.store.dispatch(new StatAction.Load());
        }
      }),
      filter((statList: any) => !!statList),
      take(1),
    );
  }

  canActivate(): Observable<boolean> {
    return this.getFromStoreOrAPI().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false)),
    );
  }
}
