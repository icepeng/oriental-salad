import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CoreService } from '../../core/core.service';
import { SearchResult } from './searchResult';

@Injectable()
export class JudgeViewFindService {
  constructor(private http: HttpClient, private coreService: CoreService) {}

  async findByName(name: string) {
    return this.http
      .post<{ uploads: SearchResult[] }>(
        `${this.coreService.API_ADDRESS}/upload/search`,
        { name },
      )
      .map(res => res.uploads)
      .toPromise();
  }
}
