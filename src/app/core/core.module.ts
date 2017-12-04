import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CoreService } from './core.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [CoreService]
})
export class CoreModule {}
