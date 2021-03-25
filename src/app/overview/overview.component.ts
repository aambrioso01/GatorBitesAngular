import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import {MapComponent} from '../map/map.component';
//import { RESTAURANTS } from '../mock-restaurants';
import { Location } from '../location';
import { RestaurantService } from '../restaurant.service';
import { ApiService } from '.././api.service';
import * as dining from '../.././assets/dining.json'
import * as building from '../.././assets/boundaries.json'




@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  @Input() location?: Location;
  @Input() selectedLocationID: string;

  locations$: Location[] = [];
  dinings$: any = (dining as any).default;
  buildings$: any = (building as any).default;

  

  constructor(private api: ApiService) {}
  headers:any;

  async ngOnInit() {

    
    await this.api.getLocation().then(val => this.locations$ = val);
    for (let i = 0; i < this.dinings$.features.length; i++) {
      let id = Number(this.dinings$.features[i].properties.ID);
      let buildingId = this.dinings$.features[i].properties.BLDG;

      let found = this.locations$.find(item => item.dinlocid === id);
      let building = this.buildings$.features.find(item => item.properties.PropHID === buildingId);

      if (id == 10) {

      }
      if (found !== undefined) {
        this.addProperties(i, found, building);
      }
    }
    console.log(this.dinings$);
  }
 
  
  selectedLocation?: Location;
  onSelect(location: Location): void {
    this.selectedLocation = location;
    console.log(this.selectedLocation);
  }

  addProperties(i, found, building) {
    this.dinings$.features[i].properties['Monday'] = found.Monday;
    this.dinings$.features[i].properties['Tuesday'] = found.Tuesday;
    this.dinings$.features[i].properties['Wednesday'] = found.Wednesday;
    this.dinings$.features[i].properties['Thursday'] = found.Thursday;
    this.dinings$.features[i].properties['Friday'] = found.Friday;
    this.dinings$.features[i].properties['Saturday'] = found.Saturday;
    this.dinings$.features[i].properties['Sunday'] = found.Sunday;
    this.dinings$.features[i].properties['buildingName'] = building.properties.PropName;

  }

  getDay(loc : Location){
    var today = (new Date()).getDay();
    if (today == 0) {
      return loc.Sunday;
    } else if (today == 1) {
      return loc.Monday;      
    } else if (today == 2) {
      return loc.Tuesday;      
    } else if (today == 3) {
      return loc.Wednesday;            
    } else if (today == 4) {
      return loc.Thursday;            
    } else if (today == 5) {
      return loc.Friday;            
    } else if (today == 6) {
      return loc.Saturday;            
    }
  }

  getHours(loc : Location) {
    let hrs : any[];
    hrs.push("Sunday: " + loc.Sunday);
    hrs.push("Monday: " + loc.Monday);
    hrs.push("Tuesday: " + loc.Tuesday);
    hrs.push("Wednesday: " + loc.Wednesday);
    hrs.push("Thursday: " + loc.Thursday);
    hrs.push("Friday: " + loc.Friday);
    hrs.push("Saturday: " + loc.Saturday);
    return hrs;
  }


  
  
  // ngOnChanges(changes: SimpleChanges)
  // {
  //   for(let i =0; i < this.locations$.length; i++)
  //   {
  //     let id = Number(this.dinings$.features[i].properties.ID);
  //     let found = this.locations$.find(item => item.dinlocid === id);
  //     // if(this.selectedLocationID == id)
  //     // {
  //     //   this.selectedLocation = found;
  //     // }
  //   }
  //   console.log(changes);
  // }
  

}
