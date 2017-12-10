import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts/release';

import { SharedModule } from '../../shared/shared.module';
import { StatsDetailComponent } from './stats-detail.component';
import { StatsDetailService } from './stats-detail.service';

@NgModule({
  imports: [SharedModule, NgxChartsModule],
  declarations: [StatsDetailComponent],
  providers: [StatsDetailService],
})
export class StatsDetailModule {}
