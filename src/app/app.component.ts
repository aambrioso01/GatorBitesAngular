import { Component, Input, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MapComponent} from './map/map.component';
var currentID;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gator Bites';


  constructor () { }

  message = currentID;

  receiveMessage($event):string {
    this.message = $event;
    currentID = this.message;
    console.log("Parent received ID as: " + this.message);
    return this.message;
  }

  setID(): string
  {
    console.log("Overiew should update now.");
    return currentID;
    
  }
}
