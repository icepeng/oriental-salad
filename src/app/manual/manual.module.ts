import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ManualComponent } from './manual.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ManualComponent]
})
export class ManualModule { }
