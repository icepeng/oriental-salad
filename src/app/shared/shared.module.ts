import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { TranslatePipe } from './translate.pipe';
import { ExplainValueComponent } from './explain-value/explain-value.component';

@NgModule({
  exports: [
    CommonModule,
    RouterModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    ExplainValueComponent,
    TranslatePipe
  ],
  imports: [
    CommonModule,
  ],
  declarations: [TranslatePipe, ExplainValueComponent]
})
export class SharedModule {}
