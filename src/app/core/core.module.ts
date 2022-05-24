import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetterPipe } from './pipes/letter.pipe';

@NgModule({
  providers: [],
  imports: [CommonModule],
  exports: [LetterPipe],
  declarations: [
    LetterPipe
  ],
})
export class CoreModule {}
