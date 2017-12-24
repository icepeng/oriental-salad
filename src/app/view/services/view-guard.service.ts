import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import * as UserAction from '../actions/user';
import * as fromView from '../reducers';

@Injectable()
export class ViewGuard implements CanActivate {
  constructor(private store: Store<fromView.State>) {}

  getFromStoreOrAPI(id: string) {
    return this.store.select(fromView.getId).pipe(
      tap((storedId: string) => {
        if (id !== storedId) {
          this.store.dispatch(new UserAction.Load({ id }));
        }
      }),
      filter((userDetail: any) => !!userDetail),
      take(1),
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.getFromStoreOrAPI(route.params['id']).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false)),
    );
  }
}
