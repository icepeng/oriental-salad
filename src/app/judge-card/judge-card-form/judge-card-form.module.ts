import { NgModule } from '@angular/core';
import { JudgeCardService } from 'app/judge-card/judge-card.service';
import { SharedModule } from 'app/shared/shared.module';
import { JudgeCardFormComponent } from './judge-card-form.component';
import { JudgeCardFormService } from './judge-card-form.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [JudgeCardFormComponent],
  providers: [JudgeCardFormService]
})
export class JudgeCardFormModule { }
