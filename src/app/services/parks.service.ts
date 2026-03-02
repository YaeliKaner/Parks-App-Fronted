import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ParkDTO from '../models/dto/parkDTO.model';
import Cities from '../models/cities.model';

@Injectable({
  providedIn: 'root',
})
export class ParksService {
  private baseUrl = 'http://localhost:8080/api/parks';

  constructor(private http: HttpClient) {}

  // כל הפארקים למסך הראשי
  getParks(): Observable<ParkDTO[]> {
    return this.http.get<ParkDTO[]>(`${this.baseUrl}/getParks`);
  }

  // קבלת פארק לפי ID
  getParkById(id: number): Observable<ParkDTO> {
    return this.http.get<ParkDTO>(`${this.baseUrl}/getParkById/${id}`);
  }

  getParkByNameAndCity(name: string, city: number): Observable<ParkDTO> {
    return this.http.get<ParkDTO>(
      `${this.baseUrl}/getParkByNameAndCity/${name}/${city}`,
    );
  }

  getParksOrderByRecommended(): Observable<ParkDTO[]> {
    return this.http.get<ParkDTO[]>(
      `${this.baseUrl}/getParksOrderByRecommended`,
    );
  }

  // העלאת פארק עם תמונה
  uploadPark(fd: FormData): Observable<ParkDTO> {
    return this.http.post<ParkDTO>(`${this.baseUrl}/uploadPark`, fd, {
      withCredentials: true,
    });
  }

  // 🔍 חיפוש טקסט חופשי
  searchParks(term: string): Observable<ParkDTO[]> {
    return this.http.get<ParkDTO[]>(`${this.baseUrl}/search`, {
      params: { term },
      withCredentials: true,
    });
  }

  // 🌟 מומלצים
  getRecommendedParks(): Observable<ParkDTO[]> {
    return this.http.get<ParkDTO[]>(`${this.baseUrl}/recommended`, {
      withCredentials: true,
    });
  }
}
