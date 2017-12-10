import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { StatsDetailModule } from './stats-detail/stats-detail.module';
import { StatsListComponent } from './stats-list/stats-list.component';
import { StatsSummaryComponent } from './stats-summary/stats-summary.component';
import { StatsTemplateComponent } from './stats-template/stats-template.component';
import { StatsService } from './stats.service';
import { StatsFilterComponent } from './stats-filter/stats-filter.component';

@NgModule({
  imports: [SharedModule, StatsDetailModule],
  declarations: [
    StatsSummaryComponent,
    StatsListComponent,
    StatsTemplateComponent,
    StatsFilterComponent,
  ],
  providers: [StatsService],
})
export class StatsModule {}
