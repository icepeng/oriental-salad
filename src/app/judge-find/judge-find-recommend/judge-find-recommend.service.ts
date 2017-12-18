import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { APP_CONFIG, AppConfig } from '../../config';
import { DynamicStat, Stat } from './stat';

@Injectable()
export class JudgeFindRecommendService {
  stats$ = this.http
    .get<{ stats: DynamicStat }>(`${this.appConfig.apiAddress}/upload/stats`)
    .publishReplay(1, 1000 * 60 * 5)
    .refCount()
    .take(1);

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  getStats() {
    const staticStats = this.appConfig.uploadStats;
    return this.stats$.map(res => ({ ...staticStats, ...res.stats }));
  }
}
