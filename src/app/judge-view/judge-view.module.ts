import { NgModule } from '@angular/core';

import { JudgeFindModule } from '../judge-find/judge-find.module';
import { SharedModule } from '../shared/shared.module';
import { JudgeViewDetailModule } from './judge-view-detail/judge-view-detail.module';
import { JudgeViewListComponent } from './judge-view-list/judge-view-list.component';
import { JudgeViewSummaryModule } from './judge-view-summary/judge-view-summary.module';
import { JudgeViewRoutingModule } from './judge-view.routing';
import { JudgeViewService } from './judge-view.service';

@NgModule({
  imports: [
    SharedModule,
    JudgeFindModule,
    JudgeViewSummaryModule,
    JudgeViewRoutingModule,
    JudgeViewDetailModule,
  ],
  providers: [JudgeViewService],
  declarations: [JudgeViewListComponent],
})
export class JudgeViewModule {}
