import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JudgeFindNameComponent } from '../judge-find/judge-find-name/judge-find-name.component';
import { JudgeFindRecommendComponent } from '../judge-find/judge-find-recommend/judge-find-recommend.component';
import { CanActivateView } from './can-activate-view.service';
import { JudgeViewDetailComponent } from './judge-view-detail/judge-view-detail.component';
import { JudgeViewListComponent } from './judge-view-list/judge-view-list.component';
import { JudgeViewSummaryComponent } from './judge-view-summary/judge-view-summary.component';

export const judgeViewRoutes: Routes = [
  {
    path: 'find/name',
    component: JudgeFindNameComponent,
  },
  {
    path: 'find',
    component: JudgeFindRecommendComponent,
  },
  {
    path: ':id',
    canActivate: [CanActivateView],
    children: [
      {
        path: 'cards/:cardId',
        component: JudgeViewDetailComponent,
      },
      {
        path: 'cards',
        component: JudgeViewListComponent,
      },
      {
        path: 'summary',
        component: JudgeViewSummaryComponent,
      },
      { path: '', pathMatch: 'full', redirectTo: 'summary' },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'find',
  },
];

@NgModule({
  imports: [RouterModule.forChild(judgeViewRoutes)],
  exports: [RouterModule],
  providers: [CanActivateView],
})
export class JudgeViewRoutingModule {}
