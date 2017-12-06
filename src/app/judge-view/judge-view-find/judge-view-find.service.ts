import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from 'app/config';

import { SearchResult } from './searchResult';

@Injectable()
export class JudgeViewFindService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  async findByName(name: string) {
    return this.http
      .post<{ uploads: SearchResult[] }>(
        `${this.appConfig.apiAddress}/upload/search`,
        { name },
      )
      .map(res => res.uploads)
      .toPromise();
  }
}
