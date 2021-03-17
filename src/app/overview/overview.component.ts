import { Component, OnInit, Input } from '@angular/core';
//import { RESTAURANTS } from '../mock-restaurants';
import { Location } from '../location';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(private restaurantService: RestaurantService) { }

  getRestaurants(): void {
    this.restaurantService.getRestaurants()
      .subscribe(restaurants => this.restaurants = restaurants);
  }

  ngOnInit() {
    this.getRestaurants();
  }

  //restaurants = RESTAURANTS;
  restaurants: Location[] = [];

  selectedLocation?: Location;
  onSelect(location: Location): void {
    this.selectedLocation = location;
  }

  @Input() location?: Location;

}
