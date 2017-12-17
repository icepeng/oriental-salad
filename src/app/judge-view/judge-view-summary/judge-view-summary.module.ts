import { JudgeViewSummaryComponent } from './judge-view-summary.component';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts/release';

import { SharedModule } from '../../shared/shared.module';
import { CardFrameComponent } from './card-frame/card-frame.component';
import { JudgeViewSummaryCardsComponent } from './judge-view-summary-cards/judge-view-summary-cards.component';
import { JudgeViewSummaryNumbersComponent } from './judge-view-summary-numbers/judge-view-summary-numbers.component';

@NgModule({
  imports: [SharedModule, NgxChartsModule],
  declarations: [
    JudgeViewSummaryComponent,
    CardFrameComponent,
    JudgeViewSummaryCardsComponent,
    JudgeViewSummaryNumbersComponent,
  ],
})
export class JudgeViewSummaryModule {}
