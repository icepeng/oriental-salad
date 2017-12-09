import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { APP_CONFIG, AppConfig } from '../../config';
import { StatDetail } from '../stats';

@Injectable()
export class StatsDetailService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  getStatsDetail(cardCode: string) {
    return this.http
      .get<{ stats: StatDetail }>(
        `${this.appConfig.apiAddress}/cards/${cardCode}/stats`,
      )
      .map(res => res.stats);
  }
}
