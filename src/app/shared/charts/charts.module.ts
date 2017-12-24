import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts/release';

import { AdvancedLegendComponent } from './advanced-legend/advanced-legend.component';
import { AdvancedPieChartComponent } from './advanced-pie-chart/advanced-pie-chart.component';
import { CustomPlotLegendComponent } from './custom-plot-legend/custom-plot-legend.component';
import { CustomPlotComponent } from './custom-plot/custom-plot.component';

@NgModule({
  imports: [NgxChartsModule],
  exports: [AdvancedPieChartComponent, CustomPlotComponent, CustomPlotLegendComponent],
  declarations: [
    AdvancedLegendComponent,
    AdvancedPieChartComponent,
    CustomPlotComponent,
    CustomPlotLegendComponent,
  ],
})
export class ChartsModule {}
