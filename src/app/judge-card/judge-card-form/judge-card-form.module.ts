import { NgModule } from '@angular/core';
import { JudgeCardService } from 'app/judge-card/judge-card.service';
import { SharedModule } from 'app/shared/shared.module';
import { JudgeCardFormComponent } from './judge-card-form.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [JudgeCardFormComponent]
})
export class JudgeCardFormModule { }
