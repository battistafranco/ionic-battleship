import { LETTERS } from './../models/constants';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'letter',
})
export class LetterPipe implements PipeTransform {
  transform(value: string | number, ...args: unknown[]): any {
    if (value !== null || value !== undefined) {
      return LETTERS.find((letter) => letter.value === Number(value) + 1)?.letter || '';
    }
  }
}
