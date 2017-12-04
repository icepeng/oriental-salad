import { NgModule } from '@angular/core';
import { JudgeCardService } from './judge-card.service';
import { JudgeCardListComponent } from './judge-card-list/judge-card-list.component';
import { JudgeCardFormModule } from './judge-card-form/judge-card-form.module';
import { SharedModule } from 'app/shared/shared.module';
import { JudgeCardConfirmComponent } from './judge-card-confirm/judge-card-confirm.component';
import { JudgeCardResultComponent } from './judge-card-result/judge-card-result.component';

@NgModule({
  imports: [SharedModule, JudgeCardFormModule],
  declarations: [JudgeCardListComponent, JudgeCardConfirmComponent, JudgeCardResultComponent],
  providers: [JudgeCardService],
})
export class JudgeCardModule {}
