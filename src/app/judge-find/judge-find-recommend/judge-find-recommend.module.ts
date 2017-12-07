import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { JudgeFindRecommendComponent } from './judge-find-recommend.component';
import { JudgeFindRecommendService } from './judge-find-recommend.service';

@NgModule({
  imports: [SharedModule],
  declarations: [JudgeFindRecommendComponent],
  providers: [JudgeFindRecommendService],
})
export class JudgeFindRecommendModule {}
