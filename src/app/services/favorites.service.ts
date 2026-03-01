// // import { HttpClient } from '@angular/common/http';
// // import { Injectable } from '@angular/core';
// // import { Observable } from 'rxjs';
// // import ParkDTO from '../models/dto/parkDTO.model';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class FavoritesService {

// //   private baseUrl = 'http://localhost:8080/api/favorites';

// //   constructor(private http: HttpClient) {}

// //   // 💚 קבלת כל המועדפים של המשתמש
// //   getMyFavorites(): Observable<ParkDTO[]> {
// //     return this.http.get<ParkDTO[]>(`${this.baseUrl}/my`, {
// //       withCredentials: true
// //     });
// //   }

// //   // ✔️ הוספה
// // addToFavorites(parkId: number): Observable<string> {
// //   return this.http.post<string>(`${this.baseUrl}/add/${parkId}`, null, {
// //     withCredentials: true,
// //     responseType: 'text' as 'json'
// //   });
// // }

// // // ✔️ הסרה
// // removeFromFavorites(parkId: number): Observable<string> {
// //   return this.http.delete<string>(`${this.baseUrl}/remove/${parkId}`, {
// //     withCredentials: true,
// //     responseType: 'text' as 'json'
// //   });
// // }
// // src/app/services/favorites.service.ts
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import ParkDTO from '../models/dto/parkDTO.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class FavoritesService {

//   private baseUrl = 'http://localhost:8080/api/favorites';

//   constructor(private http: HttpClient) {}

//   // 💚 קבלת כל המועדפים של המשתמש
//   getMyFavorites(): Observable<ParkDTO[]> {
//     return this.http.get<ParkDTO[]>(`${this.baseUrl}/my`, {
//       withCredentials: true
//     });
//   }

//   // ➕ הוספה למועדפים – מחזיר טקסט (ResponseEntity<String>)
//   addToFavorites(parkId: number): Observable<string> {
//     return this.http.post(`${this.baseUrl}/add/${parkId}`, null, {
//       withCredentials: true,
//       responseType: 'text' as 'json'
//     }) as Observable<string>;
//   }

//   // ❌ הסרה ממועדפים – גם כאן טקסט
//   removeFromFavorites(parkId: number): Observable<string> {
//     return this.http.delete(`${this.baseUrl}/remove/${parkId}`, {
//       withCredentials: true,
//       responseType: 'text' as 'json'
//     }) as Observable<string>;
//   }
// }

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import ParkDTO from '../models/dto/parkDTO.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class FavoritesService {

//   private baseUrl = 'http://localhost:8080/api/favorites';

//   constructor(private http: HttpClient) {}

//   // 💚 קבלת כל המועדפים של המשתמש
//   getMyFavorites(): Observable<ParkDTO[]> {
//     return this.http.get<ParkDTO[]>(`${this.baseUrl}/my`, {
//       withCredentials: true
//     });
//   }

//   // ➕ הוספה למועדפים
//   addToFavorites(parkId: number): Observable<string> {
//     return this.http.post<string>(`${this.baseUrl}/add/${parkId}`, null, {
//       withCredentials: true,
//       responseType: 'text' as 'json'
//     });
//   }

//   // ❌ הסרה מהמועדפים
//   removeFromFavorites(parkId: number): Observable<string> {
//     return this.http.delete<string>(`${this.baseUrl}/remove/${parkId}`, {
//       withCredentials: true,
//       responseType: 'text' as 'json'
//     });
//   }
// }
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import ParkDTO from '../models/dto/parkDTO.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class FavoritesService {

//   private baseUrl = 'http://localhost:8080/api/favorites';

//   constructor(private http: HttpClient) {}

//   // 💚 קבלת כל המועדפים של המשתמש
//   getMyFavorites(): Observable<ParkDTO[]> {
//     return this.http.get<ParkDTO[]>(`${this.baseUrl}/my`, {
//       withCredentials: true
//     });
//   }

//   // ➕ הוספה למועדפים
//   addToFavorites(parkId: number): Observable<string> {
//     return this.http.post<string>(`${this.baseUrl}/${parkId}`, null, {
//       withCredentials: true,
//       responseType: 'text' as 'json'
//     });
//   }

//   // ❌ הסרה ממועדפים
//   removeFromFavorites(parkId: number): Observable<string> {
//     return this.http.delete<string>(`${this.baseUrl}/${parkId}`, {
//       withCredentials: true,
//       responseType: 'text' as 'json'
//     });
//   }
// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ParkDTO from '../models/dto/parkDTO.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private baseUrl = 'http://localhost:8080/api/favorites';

  constructor(private http: HttpClient) {}

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
}
