import { Component, OnInit, Input } from '@angular/core';
import { Location } from '../location';

@Component({
  selector: 'app-overview-detail',
  templateUrl: './overview-detail.component.html',
  styleUrls: ['./overview-detail.component.css']
})

export class OverviewDetailComponent implements OnInit {

  constructor() { }

  @Input() list: boolean;

  ngOnInit(): void {
    this.list = true;
  }

  public toggle() {
    console.log(this.list);
    this.list = this.list?false:true;
    
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
