import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateStats } from './can-activate-stats.service';
import { StatsDetailComponent } from './stats-detail/stats-detail.component';
import { StatsListComponent } from './stats-list/stats-list.component';
import { StatsSummaryComponent } from './stats-summary/stats-summary.component';

export const statsRoutes: Routes = [
  {
    path: '',
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
];

@NgModule({
  imports: [RouterModule.forChild(statsRoutes)],
  exports: [RouterModule],
  providers: [CanActivateStats],
})
export class StatsRoutingModule {}
