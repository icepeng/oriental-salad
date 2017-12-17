import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts/release';

import { SharedModule } from '../../shared/shared.module';
import { JudgeViewDetailComponent } from './judge-view-detail.component';

@NgModule({
  imports: [SharedModule, NgxChartsModule],
  declarations: [JudgeViewDetailComponent],
})
export class JudgeViewDetailModule {}
