import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import ParkDTO from '../models/dto/parkDTO.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

    // public favorites: number[] = [];
    
      private favoritesSet = signal<Set<number>>(new Set());
      readonly favorites = this.favoritesSet.asReadonly();

  private baseUrl = 'http://localhost:8080/api/favorites';

  constructor(private http: HttpClient) {}


  // helper that updates the internal signal from an array of park DTOs
  public populateFavorites(parks: ParkDTO[]) {
    const ids = new Set(parks.map(p => p.id));
    this.favoritesSet.set(ids);
  }


  // 💚 כל המועדפים של המשתמש המחובר
  getMyFavorites(): Observable<ParkDTO[]> {
    return this.http.get<ParkDTO[]>(`${this.baseUrl}/my`, {
      withCredentials: true
    });
  }

  // ➕ הוספת פארק למועדפים
  addToFavorites(parkId: number): Observable<string> {
    return this.http.post(
      `${this.baseUrl}/${parkId}`,
      null,
      {
        withCredentials: true,
        responseType: 'text' as 'json'
      }
    ) as Observable<string>;
  }

  // ❌ הסרת פארק מהמועדפים
  removeFromFavorites(parkId: number): Observable<string> {
    return this.http.delete(
      `${this.baseUrl}/${parkId}`,
      {
        withCredentials: true,
        responseType: 'text' as 'json'
      }
    ) as Observable<string>;
  }

isFavorite(parkId: number): boolean {
    return this.favoritesSet().has(parkId);
  }

  toggleFavorite(parkId: number) {
    const current = new Set(this.favoritesSet());

    if (this.isFavorite(parkId)) {
      // אופטימיסטי: עדכן UI מיד
      current.delete(parkId);
      this.favoritesSet.set(current);

      this.removeFromFavorites(parkId).subscribe({
        error: (err) => {
          // Rollback אם נכשל
          console.error('Failed to remove favorite', err);
          current.add(parkId);
          this.favoritesSet.set(new Set(current));
        }
      });
    } else {
      current.add(parkId);
      this.favoritesSet.set(current);

      this.addToFavorites(parkId).subscribe({
        error: (err) => {
          console.error('Failed to add favorite', err);
          current.delete(parkId);
          this.favoritesSet.set(new Set(current));
        }
      });
    }
  }
}



