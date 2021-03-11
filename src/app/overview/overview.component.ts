import { Component, OnInit } from '@angular/core';
import { RESTAURANTS } from '../mock-restaurants';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  restaurants = RESTAURANTS;

  selectedLocation?: Location;
  onSelect(location: Location): void {
    this.selectedLocation = location;
  }

}
