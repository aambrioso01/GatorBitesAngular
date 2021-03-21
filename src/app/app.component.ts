import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Location } from './location'
import * as dining from '.././assets/dining.json'
import * as building from '.././assets/boundaries.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Gator Bites';
  // locations$: any;
  // dinings$: any = (dining as any).default;
  // buildings$: any = (building as any).default;

  // constructor(private api: ApiService) {}
  // headers:any;

  async ngOnInit() {
    // await this.api.getLocation().then(val => this.locations$ = val);
    // for (let i = 0; i < this.dinings$.features.length; i++) {
    //   let id = Number(this.dinings$.features[i].properties.ID);
    //   let buildingId = this.dinings$.features[i].properties.BLDG;

    //   let found = this.locations$.find(item => item.dinlocid === id);
    //   let building = this.buildings$.features.find(item => item.properties.PropHID === buildingId);

    //   if (found !== undefined) {
    //     this.dinings$.features[i].properties['Monday'] = found.Monday;
    //     this.dinings$.features[i].properties['Tuesday'] = found.Tuesday;
    //     this.dinings$.features[i].properties['Wednesday'] = found.Wednesday;
    //     this.dinings$.features[i].properties['Thursday'] = found.Thursday;
    //     this.dinings$.features[i].properties['Friday'] = found.Friday;
    //     this.dinings$.features[i].properties['Saturday'] = found.Saturday;
    //     this.dinings$.features[i].properties['Sunday'] = found.Sunday;
    //     this.dinings$.features[i].properties['buildingName'] = building.properties.PropName;
    //   }
    // }
    // console.log(this.dinings$);
  }
}
