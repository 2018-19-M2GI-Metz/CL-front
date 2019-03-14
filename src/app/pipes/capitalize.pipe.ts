import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe qui permet de mettre la premier lettre en majuscule
 */
@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
