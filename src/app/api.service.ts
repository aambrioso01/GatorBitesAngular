import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Location } from './location';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://128.227.67.168/diningHours.php";
  constructor(private http: HttpClient) { }

  async getLocation() {
    return await this.http.get<Location[]>(this.apiUrl).toPromise();

  }
}