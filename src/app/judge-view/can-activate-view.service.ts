import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { JudgeViewService } from './judge-view.service';

@Injectable()
export class CanActivateView implements CanActivate {
  constructor(
    private judgeViewService: JudgeViewService,
    private router: Router,
  ) {}

  async canActivate(route: ActivatedRouteSnapshot) {
    await this.judgeViewService.getJudge(route.params['id']);
    return true;
  }
}
