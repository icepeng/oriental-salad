import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts/release';

import { SharedModule } from '../../shared/shared.module';
import { StatsDetailHsreplayComponent } from './stats-detail-hsreplay/stats-detail-hsreplay.component';
import { StatsDetailNumbersComponent } from './stats-detail-numbers/stats-detail-numbers.component';
import { StatsDetailUsersComponent } from './stats-detail-users/stats-detail-users.component';
import { StatsDetailComponent } from './stats-detail.component';
import { StatsDetailService } from './stats-detail.service';

@NgModule({
  imports: [SharedModule, NgxChartsModule],
  declarations: [
    StatsDetailComponent,
    StatsDetailNumbersComponent,
    StatsDetailUsersComponent,
    StatsDetailHsreplayComponent,
  ],
  providers: [StatsDetailService],
})
export class StatsDetailModule {}
