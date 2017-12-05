import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { JudgeViewDetailComponent } from './judge-view-detail/judge-view-detail.component';
import { JudgeViewFindModule } from './judge-view-find/judge-view-find.module';
import { JudgeViewListComponent } from './judge-view-list/judge-view-list.component';
import { JudgeViewService } from './judge-view.service';

@NgModule({
  imports: [SharedModule, JudgeViewFindModule],
  providers: [JudgeViewService],
  declarations: [JudgeViewListComponent, JudgeViewDetailComponent],
})
export class JudgeViewModule {}
