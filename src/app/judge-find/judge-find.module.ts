import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { JudgeFindNameModule } from './judge-find-name/judge-find-name.module';
import { JudgeFindRecommendModule } from './judge-find-recommend/judge-find-recommend.module';

@NgModule({
  imports: [SharedModule, JudgeFindNameModule, JudgeFindRecommendModule],
  declarations: [],
})
export class JudgeFindModule {}
