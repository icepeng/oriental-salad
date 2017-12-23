import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { TranslatePipe } from './translate.pipe';

@NgModule({
  exports: [
    CommonModule,
    RouterModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  imports: [CommonModule],
  declarations: [TranslatePipe],
})
export class SharedModule {}
