// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ParksAiService {

//   private baseUrl = 'http://localhost:8080/api/Parks';

//   constructor(private http: HttpClient) {}

//   // קורא ל-GET /api/Parks/chat?prompt=...
// //   chat(prompt: string): Observable<string> {
// //     const params = new HttpParams().set('prompt', prompt);
// //     return this.http.get(this.baseUrl + '/chat', {
// //       params,
// //       responseType: 'text'   // חשוב! כי השרת מחזיר String ולא JSON
// //     });
// //   }
// // }

//   chat(prompt: string): Observable<string> {
//     const params = new HttpParams().set('prompt', prompt);
//     return this.http.get('http://localhost:8080/api/parks/chat', {
//       params,
//       responseType: 'text'   // חשוב! כי השרת מחזיר String ולא JSON
//     });
//   }
// }

// // chat(prompt: string): Observable<string> {
// //   const params = new HttpParams().set('prompt', prompt);
// //   return this.http.get<string>('http://localhost:8080/api/parks/chat', {
// //     params,
// //     responseType: 'text'
// //   });
// // }
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParksAiService {

  private baseUrl = 'http://localhost:8080/api/Parks';

  constructor(private http: HttpClient) {}

  // קורא ל-GET /api/Parks/chat?prompt=...
//   chat(prompt: string): Observable<string> {
//     const params = new HttpParams().set('prompt', prompt);
//     return this.http.get(this.baseUrl + '/chat', {
//       params,
//       responseType: 'text'   // חשוב! כי השרת מחזיר String ולא JSON
//     });
//   }
// }

  chat(prompt: string): Observable<string> {
    const params = new HttpParams().set('prompt', prompt);
    return this.http.get('http://localhost:8080/api/parks/chat', {
      params,
      responseType: 'text'   // חשוב! כי השרת מחזיר String ולא JSON
    });
  }
}

// chat(prompt: string): Observable<string> {
//   const params = new HttpParams().set('prompt', prompt);
//   return this.http.get<string>('http://localhost:8080/api/parks/chat', {
//     params,
//     responseType: 'text'
//   });
// }
