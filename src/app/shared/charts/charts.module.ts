import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts/release';
import { AdvancedLegendComponent } from './advanced-legend/advanced-legend.component';
import { AdvancedPieChartComponent } from './advanced-pie-chart/advanced-pie-chart.component';

@NgModule({
  imports: [NgxChartsModule],
  exports: [AdvancedPieChartComponent],
  declarations: [AdvancedLegendComponent, AdvancedPieChartComponent],
})
export class ChartsModule {}
