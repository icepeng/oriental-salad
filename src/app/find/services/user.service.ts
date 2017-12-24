import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from 'app/config';
import { map, publishReplay, refCount, take } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable()
export class UserService {
  upload$ = this.http
    .get<{ uploads: User[] }>(`${this.appConfig.apiAddress}/upload`)
    .pipe(
      map(res => res.uploads),
      publishReplay(1, 1000 * 60 * 5),
      refCount(),
      take(1),
    );

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  getAll() {
    return this.upload$;
  }
}
