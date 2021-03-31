import { Component } from '@angular/core';
import { OverviewComponent } from './overview/overview.component';
import { OverviewDetailComponent } from './overview-detail/overview-detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'Gator Bites';

  constructor () { }

  message;
  lat;
  lng;

  myOverviewComp = new OverviewComponent(null);
  myOverviewDetailComp = new OverviewDetailComponent();

  receiveMessage($event) {
    this.message = $event;
    this.myOverviewComp.setLocationOnMarker();
    this.myOverviewDetailComp.setOverview();
    //console.log("Parent received ID as: " + this.message);  
  }

  receiveLat($event) {
    this.lat = $event;
    this.myOverviewComp.setLat(this.lat);
    console.log("received lat: " + this.lat)
      
  }

  receiveLng($event) {
    this.lng = $event;
    this.myOverviewComp.setLng(this.lng);
    console.log("received lng: " + this.lng)
    
  }


  
}
