import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { JudgeViewService } from './judge-view.service';

@Injectable()
export class CanActivateDetail implements CanActivate {
  constructor(
    private judgeViewService: JudgeViewService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.judgeViewService.dataStore.cardList.length > 0) {
      return true;
    }
    this.router.navigate(['/', 'view', route.params['id']]);
  }
}
