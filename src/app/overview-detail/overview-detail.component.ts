import { Component, OnInit, Input } from '@angular/core';
import { Location } from '../location';

@Component({
  selector: 'app-overview-detail',
  templateUrl: './overview-detail.component.html',
  styleUrls: ['./overview-detail.component.css']
})

export class OverviewDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
      return "Friday: " +loc.Friday;            
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

  todaysHours(loc : Location) {
    var today = (new Date()).getDay();
    let arr: any[] = [];
    if (today == 0) {
      arr.push("Breakfast: " + loc.B_Sunday);
      arr.push("Lunch: " + loc.L_Sunday);
      arr.push("Dinner: " + loc.D_Sunday);
    } else if (today == 1) {
      arr.push("Breakfast: " + loc.B_Monday);
      arr.push("Lunch: " + loc.L_Monday);
      arr.push("Dinner: " + loc.D_Monday);
    } else if (today == 2) {
      arr.push("Breakfast: " + loc.B_Tuesday);
      arr.push("Lunch: " + loc.L_Tuesday);
      arr.push("Dinner: " + loc.D_Tuesday);
    } else if (today == 3) {
      arr.push("Breakfast: " + loc.B_Wednesday);
      arr.push("Lunch: " + loc.L_Wednesday);
      arr.push("Dinner: " + loc.D_Wednesday);
    } else if (today == 4) {
      arr.push("Breakfast: " + loc.B_Thursday);
      arr.push("Lunch: " + loc.L_Thursday);
      arr.push("Dinner: " + loc.D_Thursday);
    } else if (today == 5) {
      arr.push("Breakfast: " + loc.B_Friday);
      arr.push("Lunch: " + loc.L_Friday);
      arr.push("Dinner: " + loc.D_Friday);
    } else if (today == 6) {
      arr.push("Breakfast: " + loc.B_Saturday);
      arr.push("Lunch: " + loc.L_Saturday);
      arr.push("Dinner: " + loc.D_Saturday);
    }

    return arr;
  }

  breakfastHours(loc : Location) {
    let arr: any[] = [];
    arr.push("Sunday: " + loc.B_Sunday);
    arr.push("Monday: " + loc.B_Monday);
    arr.push("Tuesday: " + loc.B_Tuesday);
    arr.push("Wednesday: " + loc.B_Wednesday);
    arr.push("Thursday: " + loc.B_Thursday);
    arr.push("Friday: " + loc.B_Friday);
    arr.push("Saturday: " + loc.B_Saturday);
    return arr;
  }


  lunchHours(loc : Location) {
    let arr: any[] = [];
    arr.push("Sunday: " + loc.L_Sunday);
    arr.push("Monday: " + loc.L_Monday);
    arr.push("Tuesday: " + loc.L_Tuesday);
    arr.push("Wednesday: " + loc.L_Wednesday);
    arr.push("Thursday: " + loc.L_Thursday);
    arr.push("Friday: " + loc.L_Friday);
    arr.push("Saturday: " + loc.L_Saturday);
    return arr;
  }

  dinnerHours(loc : Location) {
    let arr: any[] = [];    
    arr.push("Sunday: " + loc.D_Sunday);
    arr.push("Monday: " + loc.D_Monday);
    arr.push("Tuesday: " + loc.D_Tuesday);
    arr.push("Wednesday: " + loc.D_Wednesday);
    arr.push("Thursday: " + loc.D_Thursday);
    arr.push("Friday: " + loc.D_Friday);
    arr.push("Saturday: " + loc.D_Saturday);
    return arr;
  }

}
