import { NgModule } from '@angular/core';
import { JudgeCardService } from './judge-card.service';
import { JudgeCardListComponent } from './judge-card-list/judge-card-list.component';
import { JudgeCardFormModule } from './judge-card-form/judge-card-form.module';
import { SharedModule } from 'app/shared/shared.module';
import { JudgeCardConfirmComponent } from './judge-card-confirm/judge-card-confirm.component';

@NgModule({
  imports: [SharedModule, JudgeCardFormModule],
  declarations: [JudgeCardListComponent, JudgeCardConfirmComponent],
  providers: [JudgeCardService],
})
export class JudgeCardModule {}
