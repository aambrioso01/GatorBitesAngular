import { Injectable } from '@angular/core';
import { Location } from './location';
// import { RESTAURANTS } from './mock-restaurants';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor() { }

  // getRestaurants(): Observable<Location[]> {
  //   const restaurants = of(RESTAURANTS)
  //   return restaurants;
  // }
}
