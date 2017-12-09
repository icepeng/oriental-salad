import { StatsDetailComponent } from './stats/stats-detail/stats-detail.component';
import { StatsListComponent } from './stats/stats-list/stats-list.component';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { JudgeFindNameComponent } from './judge-find/judge-find-name/judge-find-name.component';
import { JudgeFindRecommendComponent } from './judge-find/judge-find-recommend/judge-find-recommend.component';
import { CanActivateView } from './judge-view/can-activate-view.service';
import { JudgeViewDetailComponent } from './judge-view/judge-view-detail/judge-view-detail.component';
import { JudgeViewListComponent } from './judge-view/judge-view-list/judge-view-list.component';
import { JudgeViewSummaryComponent } from './judge-view/judge-view-summary/judge-view-summary.component';
import { CanActivateStats } from './stats/can-activate-stats.service';
import { StatsSummaryComponent } from './stats/stats-summary/stats-summary.component';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  // { path: 'manual', component: ManualComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  // {
  //   path: 'judge/confirm',
  //   component: JudgeCardConfirmComponent,
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'judge/result/:id',
  //   component: JudgeCardResultComponent,
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'judge/form/:id',
  //   component: JudgeCardFormComponent,
  //   canDeactivate: [CanDeactivateGuard],
  // },
  // { path: 'judge', component: JudgeCardListComponent, pathMatch: 'full' },
  {
    path: 'view',
    children: [
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
    ],
  },
  {
    path: 'stats',
    canActivate: [CanActivateStats],
    children: [
      {
        path: 'summary',
        component: StatsSummaryComponent,
      },
      {
        path: 'list',
        component: StatsListComponent,
      },
      {
        path: ':id',
        component: StatsDetailComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'summary',
      },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
