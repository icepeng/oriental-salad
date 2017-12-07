import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { JudgeFindNameComponent } from './judge-find-name.component';
import { JudgeFindNameService } from './judge-find-name.service';

@NgModule({
  imports: [SharedModule],
  declarations: [JudgeFindNameComponent],
  providers: [JudgeFindNameService],
})
export class JudgeFindNameModule {}
