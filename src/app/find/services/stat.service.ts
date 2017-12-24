import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, publishReplay, refCount, take } from 'rxjs/operators';

import { APP_CONFIG, AppConfig } from '../../config';
import { DynamicStat } from '../models/stat';

@Injectable()
export class StatService {
  stats$ = this.http
    .get<{ stats: DynamicStat }>(`${this.appConfig.apiAddress}/upload/stats`)
    .pipe(
      map(res => res.stats),
      publishReplay(1, 1000 * 60 * 5),
      refCount(),
      take(1),
    );

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  getStats() {
    const staticStats = this.appConfig.uploadStats;
    return this.stats$.pipe(map(stats => ({ ...staticStats, ...stats })));
  }
}
