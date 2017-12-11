import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { TranslatePipe } from './translate.pipe';
import { FbCommentsComponent } from './fb-comments/fb-comments.component';

@NgModule({
  exports: [
    CommonModule,
    RouterModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    FbCommentsComponent,
    TranslatePipe
  ],
  imports: [
    CommonModule,
  ],
  declarations: [TranslatePipe, FbCommentsComponent]
})
export class SharedModule {}
