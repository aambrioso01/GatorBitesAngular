import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(items: any[], args: any[]): any[] {
    let filterBy = args[0];
    console.log(args);
    if(!items) return [];
    console.log(filterBy);
    return items.filter( it => {
      // console.log(it.properties.ID + " " + it.properties.open);
        return it.properties.open.includes("true");
      // .open.includes(true);
    });

  }
}

