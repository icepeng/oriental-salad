import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { JudgeViewDetailComponent } from './judge-view-detail/judge-view-detail.component';
import { JudgeViewListComponent } from './judge-view-list/judge-view-list.component';
import { JudgeViewSummaryModule } from './judge-view-summary/judge-view-summary.module';
import { JudgeViewService } from './judge-view.service';

@NgModule({
  imports: [SharedModule, JudgeViewSummaryModule],
  providers: [JudgeViewService],
  declarations: [JudgeViewListComponent, JudgeViewDetailComponent],
})
export class JudgeViewModule {}
