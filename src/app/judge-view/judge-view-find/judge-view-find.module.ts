import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { JudgeViewFindComponent } from './judge-view-find.component';
import { JudgeViewFindService } from './judge-view-find.service';

@NgModule({
  imports: [SharedModule],
  declarations: [JudgeViewFindComponent],
  providers: [JudgeViewFindService],
})
export class JudgeViewFindModule {}
