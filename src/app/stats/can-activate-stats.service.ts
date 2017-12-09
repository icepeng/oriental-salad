import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { StatsService } from './stats.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CanActivateStats {
  constructor(private statsService: StatsService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot) {
    if (this.statsService.dataStore.cardList.length === 0) {
      await this.statsService.getStats();
    }
    return true;
  }
}
