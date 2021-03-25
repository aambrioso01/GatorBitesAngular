import { Component } from '@angular/core';
import { OverviewComponent } from './overview/overview.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'Gator Bites';

  constructor () { }

  message;

  myOverviewComp = new OverviewComponent(null);

  receiveMessage($event) {
    this.message = $event;
    this.myOverviewComp.setLocationOnMarker();
    //console.log("Parent received ID as: " + this.message);  
  }
  
}
