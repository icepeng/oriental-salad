import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from 'app/config';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Stat, StatList } from '../models/stat';

@Injectable()
export class StatService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  getStats(): Observable<StatList> {
    return this.http
      .get<{ stats: Stat[] }>(`${this.appConfig.apiAddress}/cards/stats`)
      .pipe(
        map(res =>
          res.stats.reduce(
            (obj, stat) => ({
              ...obj,
              [stat.cardCode]: stat,
            }),
            {} as StatList,
          ),
        ),
      );
  }
}
