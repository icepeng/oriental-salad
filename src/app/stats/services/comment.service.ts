import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { APP_CONFIG, AppConfig } from '../../config';
import { Comments } from '../models/comment';

@Injectable()
export class CommentService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  getComments(cardCode: string) {
    return this.http
      .get<{ stats: Comments }>(
        `${this.appConfig.apiAddress}/cards/${cardCode}/stats`,
      )
      .pipe(map(res => res.stats));
  }
}
