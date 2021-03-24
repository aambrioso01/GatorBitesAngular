import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '../location';

@Component({
  selector: 'app-overview-detail',
  templateUrl: './overview-detail.component.html',
  styleUrls: ['./overview-detail.component.css']
})

export class OverviewDetailComponent implements OnInit {

  constructor() { }

  @Input() list: boolean;

  list2: boolean = false;

  @Output() listEvent = new EventEmitter<boolean>();

  ngOnInit(): void {}

  toggle() {
    //this.list2 = this.list2?false:true;
    this.listEvent.emit(this.list2);
    console.log("list2 = " + this.list2);
    
  }

  @Input() location?: Location;

  getDay(loc : Location){
    var today = (new Date()).getDay();
    if (today == 0) {
      return "Sunday: " + loc.Sunday;
    } else if (today == 1) {
      return "Monday: " + loc.Monday;      
    } else if (today == 2) {
      return "Tuesday: " + loc.Tuesday;      
    } else if (today == 3) {
      return "Wednesday: " + loc.Wednesday;            
    } else if (today == 4) {
      return "Thursday: " +loc.Thursday;            
    } else if (today == 5) {
      return "Frida: " +loc.Friday;            
    } else if (today == 6) {
      return "Saturday: " +loc.Saturday;            
    }
  }

  getWeek(loc : Location) {
    var today = (new Date()).getDay();
    today++;
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let i = 0;
    let wk : any[] = [];
    while (i < 6) {
      if (today == 7) {
        today = 0;
      }
      wk.push(days[today] + ": " + loc[days[today]]);
      today++;
      i++;
    }
    return wk;
  }
}
