import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from 'app/config';

import { SearchResult } from './searchResult';

@Injectable()
export class JudgeFindNameService {
  upload$ = this.http
    .get<{ uploads: SearchResult[] }>(`${this.appConfig.apiAddress}/upload`)
    .map(res => res.uploads)
    .publishReplay(1, 1000 * 60 * 5)
    .refCount()
    .take(1);

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  getAll() {
    return this.upload$;
  }
}
