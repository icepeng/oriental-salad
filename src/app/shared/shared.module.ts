import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { TranslatePipe } from './translate.pipe';
import { LivereModule } from 'ngx-livere';

@NgModule({
  exports: [
    CommonModule,
    RouterModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    LivereModule,
    TranslatePipe,
  ],
  imports: [CommonModule],
  declarations: [TranslatePipe],
})
export class SharedModule {}
