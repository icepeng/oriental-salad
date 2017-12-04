import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { JudgeViewDetailComponent } from './judge-view-detail/judge-view-detail.component';
import { JudgeViewListComponent } from './judge-view-list/judge-view-list.component';
import { JudgeViewService } from './judge-view.service';

@NgModule({
  imports: [CommonModule],
  providers: [JudgeViewService],
  declarations: [JudgeViewListComponent, JudgeViewDetailComponent],
})
export class JudgeViewModule {}
