import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StatGuard } from './services/stat-guard.service';
import { StatService } from './services/stat.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [],
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [StatService, StatGuard],
    };
  }
}
