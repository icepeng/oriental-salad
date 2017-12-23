import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { JudgeCardConfirmComponent } from './judge-card-confirm/judge-card-confirm.component';
import { JudgeCardFormModule } from './judge-card-form/judge-card-form.module';
import { JudgeCardListComponent } from './judge-card-list/judge-card-list.component';
import { JudgeCardResultComponent } from './judge-card-result/judge-card-result.component';
import { JudgeCardService } from './judge-card.service';

@NgModule({
  imports: [SharedModule, JudgeCardFormModule],
  declarations: [
    JudgeCardListComponent,
    JudgeCardConfirmComponent,
    JudgeCardResultComponent,
  ],
  providers: [JudgeCardService],
})
export class JudgeCardModule {}
