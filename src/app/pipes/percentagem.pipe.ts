import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentagem'
})
export class PercentagemPipe implements PipeTransform {

  constructor() { }
  transform(number) {
    return ((1 - number)*100).toFixed();
  }

}
