import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from '../shared/shared.module';
import { StatsDetailCommentsComponent } from './components/stats-detail-comments.component';
import { StatsDetailHsreplayComponent } from './components/stats-detail-hsreplay.component';
import { StatsDetailNumbersComponent } from './components/stats-detail-numbers.component';
import { StatsFilterComponent } from './components/stats-filter.component';
import { StatsDetailComponent } from './containers/stats-detail.component';
import { StatsListComponent } from './containers/stats-list.component';
import { StatsSummaryComponent } from './containers/stats-summary.component';
import { CommentEffects } from './effects/comment';
import { reducers } from './reducers';
import { CommentService } from './services/comment.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
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
    ]),
    StoreModule.forFeature('statViewer', reducers),
    EffectsModule.forFeature([CommentEffects]),
    NgxChartsModule,
  ],
  declarations: [
    StatsSummaryComponent,
    StatsListComponent,
    StatsDetailComponent,
    StatsDetailCommentsComponent,
    StatsDetailHsreplayComponent,
    StatsDetailNumbersComponent,
    StatsFilterComponent,
  ],
  providers: [CommentService],
})
export class StatsModule {}
