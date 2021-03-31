import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(items: any[], args: string): any[] {
    if (!args) return items;
    // if(!items) return [];

    let filterBy = args;
    console.log(filterBy);
    if (filterBy.includes("open")) {
      return items.filter( it => {
          return it.properties.open.includes("true");
      });
    } else if (args.includes("dis")) {
      items.sort((a: any, b: any) => {
        if (typeof a.properties.dist !== "undefined" && typeof b.properties.dist !== "undefined") {
          if (a.properties.dist < b.properties.dist) {
            return -1;
          } else if (a.properties.dist > b.properties.dist) {
            return 1;
          } else {
            return 0;
          }
        }
      });
      return items;
    }

  }
}

