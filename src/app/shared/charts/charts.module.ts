import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts/release';
import { AdvancedLegendComponent } from './advanced-legend/advanced-legend.component';
import { AdvancedPieChartComponent } from './advanced-pie-chart/advanced-pie-chart.component';
import { CustomPlotComponent } from './custom-plot/custom-plot.component';

@NgModule({
  imports: [NgxChartsModule],
  exports: [AdvancedPieChartComponent, CustomPlotComponent],
  declarations: [
    AdvancedLegendComponent,
    AdvancedPieChartComponent,
    CustomPlotComponent,
  ],
})
export class ChartsModule {}
