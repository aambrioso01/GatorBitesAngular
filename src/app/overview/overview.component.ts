import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
//import { RESTAURANTS } from '../mock-restaurants';
import { Location } from '../location';
import { RestaurantService } from '../restaurant.service';
import { ApiService } from '.././api.service';
import { SelectionService } from '.././selection.service';
import * as dining from '../.././assets/dining.json'
import * as building from '../.././assets/boundaries.json'


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  providers: [
    SelectionService
  ]
})
export class OverviewComponent implements OnInit {

  private _selectedLocationID: number;

  @Input() location?: Location;
  @Input() selectedLocationID: string;
  // getRestaurants(): void {
  //   this.restaurantService.getRestaurants()
  //     .subscribe(restaurants => this.restaurants = restaurants);
  // }
  opened : boolean = false;
  searchText = '';
  sortByParam = '';
  @Input() Lat: number;
  @Input() Lng: number;

  name: '';
  message: string;

  //public list:boolean;

  list = true;

  receiveList($event) {
    this.list = $event;
    this.selectedLocation = null;
  }

  setLocationOnMarker() {
    //console.log("this.selectedLocationID: " + this._selectedLocationID);
    let id = this.selectedLocationID;
    let found = this.dinings$.features.find(item => item.properties.ID === id);
    this.selectedLocation = found;
    this.list = true;
    //console.log("ID: " + id);
    //console.log("Found: " + found);
    //console.log(this.dinings$.features);
  }


  locations$: Location[] = [];
  dinings$: any = (dining as any).default;
  buildings$: any = (building as any).default;
  openArr : any[] = [];

  places : any;



  constructor(private api: ApiService) { }
  headers: any;
  
  curr_position: number[] = [29.64636443982178, -82.34316087863382];

  selectChangeHandler () {
    //update the ui
    this.opened = !this.opened;
  }

  async ngOnInit() {
    // console.log("hey girlie" + this.selectedLocationID);

    this.list = true;

    var today = (new Date()).getDay();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var hour = (new Date()).getHours();
    
    await this.api.getLocation().then(val => this.locations$ = val);
    for (let i = 0; i < this.dinings$.features.length; i++) {
      let id = Number(this.dinings$.features[i].properties.ID);
      let buildingId = this.dinings$.features[i].properties.BLDG;

      let found = this.locations$.find(item => item.dinlocid === id);
      let building = this.buildings$.features.find(item => item.properties.PropHID === buildingId);

      if (id == 10) {
        found = this.locations$.find(item => item.dinlocid === 72);
        this.addBreakfast(i, found);

        found = this.locations$.find(item => item.dinlocid === 73);
        this.addLunch(i, found);

        found = this.locations$.find(item => item.dinlocid === 74);
        this.addDinner(i, found);

        this.dinings$.features[i].properties['buildingName'] = building.properties.PropName;
      } else if (id == 8) {
        found = this.locations$.find(item => item.dinlocid === 57);
        this.addBreakfast(i, found);

        found = this.locations$.find(item => item.dinlocid === 58);
        this.addLunch(i, found);

        found = this.locations$.find(item => item.dinlocid === 59);
        this.addDinner(i, found);

        this.dinings$.features[i].properties['buildingName'] = building.properties.PropName;
      } else if (typeof found !== "undefined") {
        this.addProperties(i, found, building);
      } 

      let hours = this.dinings$.features[i].properties[days[today]];
      let meals = ["B", "L", "D"];
      let meal = "";
      if (hour < 11) {
        meal = meals[0];
      } else if (hour < 16) {
        meal = meals[1];        
      } else {
        meal = meals[2];
      }

      meal = meal + "_" + days[today];
      console.log(this.dinings$.features[i].properties.ID);
      let dinHours = this.dinings$.features[i].properties[meal];
if (this.dinings$.features[i].properties.ID == 52) {
  console.log(dinHours);
      console.log(hours);

}

      if (typeof hours !== "undefined") {
        // var splitted = hours.split(/-/);
        var splitted = hours.split(/:|-/);

        // console.log(this.dinings$.features[i].properties.ID + " " + splitted);
        if (splitted[0] !== "CLOSED") {
          // let lower = new Date(splitted[0]);
          // let upper = new Date(splitted[2]);
          let lower = Number(splitted[0]);
          let upper = Number(splitted[2]) + 12;

          // console.log(lower);
          // console.log(upper);
// console.log(hour);

          if (hour > lower && hour < upper) {
            // console.log(this.dinings$.features[i]);
            this.dinings$.features[i].properties['open'] = "true";
          } else {
            this.dinings$.features[i].properties['open'] = "false";
          }
        } else {
          this.dinings$.features[i].properties['open'] = "false";
        }
      } else if (typeof dinHours !== "undefined") {
        // console.log("dining");
        var splitted = dinHours.split(/:|-/);

        // console.log(this.dinings$.features[i].properties.ID + " " + splitted);
        if (splitted[0] !== "CLOSED") {
          let lower = Number(splitted[0]);
          let upper = Number(splitted[2]) + 12;
          if (hour > lower && hour < upper) {
            // console.log(this.dinings$.features[i]);
            this.dinings$.features[i].properties['open'] = "true";
          }
        } else {
          this.dinings$.features[i].properties['open'] = "false";
        }
      } else {
        this.dinings$.features[i].properties['open'] = "false";
      }

    }

    // console.log(this.dinings$);
this.places = this.dinings$;
// console.log(this.places);

  }

  //if selectedLocationID updates, call function to set location from marker ID
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedLocationID']) {
      this.setLocationOnMarker()
    }
    if(changes['Lat'])
    {
      this.setLat(this.Lat);
      //console.log("lat change detected on overview component");
    }
    if(changes['Lng'])
    {
      this.setLng(this.Lng);
    }
  }

  selectedLocation?: Location;
  onSelect(location: Location): void {
    this.selectedLocation = location;
    console.log(this.selectedLocation);

    this.list = true;
    console.log(this.list);

    //window.scroll(0,0);
  }

  getOpen(){
    var today = (new Date()).getDay();
    var hour = (new Date()).getHours();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // console.log(this.dinings$);
    console.log(this.dinings$.features.length);

    for (let i = 0; i < this.dinings$.features.length; i++){
      // if (!this.dinings$.features[i].properties.B_Monday) {
        console.log("hi");
        let hours = this.dinings$.features[i].properties[days[today]];
        // console.log(hours);
        if (typeof hours !== "undefined") {
          var splitted = hours.split(/:|-/);
          let lower = Number(splitted[0]);
          let upper = Number(splitted[2]);
          if (hour > lower && hour < upper) {
            this.openArr.push(this.dinings$.features[i]);
          }
        }

        // console.log(splitted)
  
      // }


    }

    console.log(this.openArr);

    // return open;

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

  addBreakfast(i, found) {
    this.dinings$.features[i].properties['B_Monday'] = found.Monday;
    this.dinings$.features[i].properties['B_Tuesday'] = found.Tuesday;
    this.dinings$.features[i].properties['B_Wednesday'] = found.Wednesday;
    this.dinings$.features[i].properties['B_Thursday'] = found.Thursday;
    this.dinings$.features[i].properties['B_Friday'] = found.Friday;
    this.dinings$.features[i].properties['B_Saturday'] = found.Saturday;
    this.dinings$.features[i].properties['B_Sunday'] = found.Sunday;
  }

  addLunch(i, found) {
    this.dinings$.features[i].properties['L_Monday'] = found.Monday;
    this.dinings$.features[i].properties['L_Tuesday'] = found.Tuesday;
    this.dinings$.features[i].properties['L_Wednesday'] = found.Wednesday;
    this.dinings$.features[i].properties['L_Thursday'] = found.Thursday;
    this.dinings$.features[i].properties['L_Friday'] = found.Friday;
    this.dinings$.features[i].properties['L_Saturday'] = found.Saturday;
    this.dinings$.features[i].properties['L_Sunday'] = found.Sunday;
  }

  addDinner(i, found) {
    this.dinings$.features[i].properties['D_Monday'] = found.Monday;
    this.dinings$.features[i].properties['D_Tuesday'] = found.Tuesday;
    this.dinings$.features[i].properties['D_Wednesday'] = found.Wednesday;
    this.dinings$.features[i].properties['D_Thursday'] = found.Thursday;
    this.dinings$.features[i].properties['D_Friday'] = found.Friday;
    this.dinings$.features[i].properties['D_Saturday'] = found.Saturday;
    this.dinings$.features[i].properties['D_Sunday'] = found.Sunday;
  }


  getDay(loc: Location) {
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

  getDiningHallDay(loc: Location) {
    var today = (new Date()).getDay();
    var hour = (new Date()).getHours();

    if (hour < 11) {
      if (today == 0) {
        return loc.B_Sunday;
      } else if (today == 1) {
        return loc.B_Monday;
      } else if (today == 2) {
        return loc.B_Tuesday;
      } else if (today == 3) {
        return loc.B_Wednesday;
      } else if (today == 4) {
        return loc.B_Thursday;
      } else if (today == 5) {
        return loc.B_Friday;
      } else if (today == 6) {
        return loc.B_Saturday;
      }
    } else if (hour < 16) {
      if (today == 0) {
        return loc.L_Sunday;
      } else if (today == 1) {
        return loc.L_Monday;
      } else if (today == 2) {
        return loc.L_Tuesday;
      } else if (today == 3) {
        return loc.L_Wednesday;
      } else if (today == 4) {
        return loc.L_Thursday;
      } else if (today == 5) {
        return loc.L_Friday;
      } else if (today == 6) {
        return loc.L_Saturday;
      }
    } else {
      if (today == 0) {
        return loc.D_Sunday;
      } else if (today == 1) {
        return loc.D_Monday;
      } else if (today == 2) {
        return loc.D_Tuesday;
      } else if (today == 3) {
        return loc.D_Wednesday;
      } else if (today == 4) {
        return loc.D_Thursday;
      } else if (today == 5) {
        return loc.D_Friday;
      } else if (today == 6) {
        return loc.D_Saturday;
      }
    }
  }

  getHours(loc: Location) {
    let hrs: any[];
    hrs.push("Sunday: " + loc.Sunday);
    hrs.push("Monday: " + loc.Monday);
    hrs.push("Tuesday: " + loc.Tuesday);
    hrs.push("Wednesday: " + loc.Wednesday);
    hrs.push("Thursday: " + loc.Thursday);
    hrs.push("Friday: " + loc.Friday);
    hrs.push("Saturday: " + loc.Saturday);
    return hrs;
  }

  setLat(lat: number)
  {
    this.curr_position[0] = lat; 
    console.log("Stored lat on overview: " + this.curr_position[0]);
  }
  setLng(lng: number)
  {
    this.curr_position[1] = lng; 
    console.log("Stored lng onn overview: " + this.curr_position[1]);
  }
  
  getDistance(location: any, lat: number, lon: number) {
    var radLat1 = lat * Math.PI / 180.0;
    var radLat2 = this.curr_position[0] * Math.PI / 180.0;
    //console.log(this.curr_position[0]);
    var a = radLat1 - radLat2;
    var b = lon * Math.PI / 180.0 - this.curr_position[1] * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    if (s >= 1) {
      location['dist'] = s.toPrecision(2);
      return s.toPrecision(2) + "km";
    }
    else {
      location['dist'] = Number((s * 1000).toPrecision(3)).toFixed(0);
      return Number((s * 1000).toPrecision(3)).toFixed(0) + "m";
    }
  }

}
