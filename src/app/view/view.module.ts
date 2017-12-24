import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from '../shared/shared.module';
import { CardFrameComponent } from './components/card-frame.component';
import { ViewFilterComponent } from './components/view-filter.component';
import { ViewSummaryCardsComponent } from './components/view-summary-cards.component';
import { ViewSummaryNumbersComponent } from './components/view-summary-numbers.component';
import { ViewDetailComponent } from './containers/view-detail.component';
import { ViewListComponent } from './containers/view-list.component';
import { ViewSummaryComponent } from './containers/view-summary.component';
import { UserEffects } from './effects/user';
import { reducers } from './reducers';
import { ViewGuard } from './services/view-guard.service';
import { ViewService } from './services/view.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: ':id',
        canActivate: [ViewGuard],
        children: [
          {
            path: 'cards/:cardId',
            component: ViewDetailComponent,
          },
          {
            path: 'cards',
            component: ViewListComponent,
          },
          {
            path: 'summary',
            component: ViewSummaryComponent,
          },
          { path: '', pathMatch: 'full', redirectTo: 'summary' },
        ],
      },
    ]),
    StoreModule.forFeature('view', reducers),
    EffectsModule.forFeature([UserEffects]),
    NgxChartsModule,
  ],
  providers: [ViewService, ViewGuard],
  declarations: [
    ViewListComponent,
    ViewSummaryComponent,
    ViewDetailComponent,
    ViewSummaryCardsComponent,
    ViewSummaryNumbersComponent,
    ViewFilterComponent,
    CardFrameComponent,
  ],
})
export class ViewModule {}
