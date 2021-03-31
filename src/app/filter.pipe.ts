import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
      searchText = searchText.toLowerCase();
    return items.filter( it => {
      console.log(it.properties.buildingName);
    return it.properties.Name.toLowerCase().includes(searchText) || it.properties.buildingName.toLowerCase().includes(searchText);
    });
    }
    }
