import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from 'app/config';
import { map } from 'rxjs/operators';

import { UserDetail } from '../models/user';

@Injectable()
export class ViewService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  getUserDetail(id: string) {
    return this.http
      .get<{ upload: UserDetail }>(`${this.appConfig.apiAddress}/upload/${id}`)
      .pipe(map(res => res.upload));
  }
}
