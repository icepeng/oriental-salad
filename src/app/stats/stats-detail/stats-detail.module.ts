import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts/release';

import { SharedModule } from '../../shared/shared.module';
import { StatsDetailNumbersComponent } from './stats-detail-numbers/stats-detail-numbers.component';
import { StatsDetailComponent } from './stats-detail.component';
import { StatsDetailService } from './stats-detail.service';

@NgModule({
  imports: [SharedModule, NgxChartsModule],
  declarations: [StatsDetailComponent, StatsDetailNumbersComponent],
  providers: [StatsDetailService],
})
export class StatsDetailModule {}
