import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts/release';

import { SharedModule } from '../../shared/shared.module';
import { StatsDetailComponent } from './stats-detail.component';
import { StatsDetailService } from './stats-detail.service';
import { StatsDetailNumbersComponent } from './stats-detail-numbers/stats-detail-numbers.component';

@NgModule({
  imports: [SharedModule, NgxChartsModule],
  declarations: [StatsDetailComponent, StatsDetailNumbersComponent],
  providers: [StatsDetailService],
})
export class StatsDetailModule {}
