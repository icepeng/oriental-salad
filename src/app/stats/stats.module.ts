import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsService } from './stats.service';
import { StatsSummaryComponent } from './stats-summary/stats-summary.component';
import { StatsListComponent } from './stats-list/stats-list.component';
import { StatsDetailComponent } from './stats-detail/stats-detail.component';
import { StatsTemplateComponent } from './stats-template/stats-template.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StatsSummaryComponent, StatsListComponent, StatsDetailComponent, StatsTemplateComponent],
  providers: [StatsService]
})
export class StatsModule { }
