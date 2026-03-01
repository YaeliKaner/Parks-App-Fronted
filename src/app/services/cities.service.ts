import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Cities from '../models/cities.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private _httpClient: HttpClient) { }

  getCities(): Observable<Cities[]> {
    return this._httpClient.get<Cities[]>('http://localhost:8080/api/cities/getCities');
  }

  addCity(city: Cities):Observable<Cities> {
    return this._httpClient.post<Cities>('http://localhost:8080/api/cities/addCity', city);
  }

  getCitiesAfterSearch(search: string): Observable<Cities[]> {
    return this._httpClient.get<Cities[]>(`http://localhost:8080/api/cities/getCityContainingLetters?search=${search}`);
  }


}
