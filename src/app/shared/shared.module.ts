import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { CardNavigateComponent } from './card-navigate/card-navigate.component';
import { TranslatePipe } from './translate.pipe';

@NgModule({
  exports: [
    CommonModule,
    RouterModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    CardNavigateComponent,
  ],
  imports: [CommonModule, ClarityModule],
  declarations: [TranslatePipe, CardNavigateComponent],
})
export class SharedModule {}
