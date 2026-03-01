// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import WeatherDTO from '../models/dto/weatherDTO.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class WeatherService {

//   // אם צריך לשנות פורט / כתובת שרת – תשני כאן
//   private baseUrl = 'http://localhost:8080/api/weather';

//   constructor(private http: HttpClient) {}

//   getWeatherForPark(parkId: number): Observable<WeatherDTO> {
//     return this.http.get<WeatherDTO>(`${this.baseUrl}/park/${parkId}`);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import WeatherDTO from '../models/dto/weatherDTO.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private baseUrl = 'http://localhost:8080/api/weather';

  constructor(private http: HttpClient) {}

  getWeatherForPark(parkId: number): Observable<WeatherDTO> {
    return this.http.get<WeatherDTO>(
      `${this.baseUrl}/park/${parkId}`,
      { withCredentials: true }   // 👈 חשוב!
    );
  }
}
