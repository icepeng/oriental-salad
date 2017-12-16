import { NgxChartsModule } from '@swimlane/ngx-charts/release';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { JudgeViewDetailComponent } from './judge-view-detail/judge-view-detail.component';
import { JudgeViewListComponent } from './judge-view-list/judge-view-list.component';
import { JudgeViewService } from './judge-view.service';
import { JudgeViewSummaryComponent } from './judge-view-summary/judge-view-summary.component';

@NgModule({
  imports: [SharedModule, NgxChartsModule],
  providers: [JudgeViewService],
  declarations: [
    JudgeViewListComponent,
    JudgeViewDetailComponent,
    JudgeViewSummaryComponent,
  ],
})
export class JudgeViewModule {}
