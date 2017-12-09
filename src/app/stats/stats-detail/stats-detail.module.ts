import { NgModule } from '@angular/core';

import { ChartsModule } from '../../shared/charts/charts.module';
import { SharedModule } from '../../shared/shared.module';
import { StatsDetailComponent } from './stats-detail.component';
import { StatsDetailService } from './stats-detail.service';

@NgModule({
  imports: [SharedModule, ChartsModule],
  declarations: [StatsDetailComponent],
  providers: [StatsDetailService],
})
export class StatsDetailModule {}
