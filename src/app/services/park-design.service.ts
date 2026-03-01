import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ParkDesign from '../models/parkDesign.model';
import { catchError, Observable, of, throwError } from 'rxjs';
import ParkDesignDTO from '../models/dto/parkDesignDTO.model';

@Injectable({
  providedIn: 'root'
})
export class ParkDesignService {

  constructor(private _httpClient : HttpClient) { }

  // addParkDesign(newDesign: ParkDesign): Observable<ParkDesignDTO> {
  //   return this._httpClient.post<ParkDesignDTO>('http://localhost:8080/api/parkDesign/addParkDesign', newDesign, {
  //       withCredentials: true
  //     });
  // }

addParkDesign(data: Partial<ParkDesign>): Observable<Partial<ParkDesignDTO>> {
  return this._httpClient.post<Partial<ParkDesignDTO>>('http://localhost:8080/api/parkDesign/addParkDesign',data,
    {
    withCredentials: true
  }
  );
}


// getLatestDesignByParkAndFeature(parkId: number, featureId: number): Observable<ParkDesignDTO | null> {
//   return this._httpClient.get<ParkDesignDTO>(
//     `http://localhost:8080/getLatestDesignByParkAndFeature/${parkId}/${featureId}`,
//     { withCredentials: true }
//   ).pipe(
//     catchError(err => {
//       if (err.status === 404) {
//         // 404 = אין עדיין עיצוב → זה לגיטימי! מחזירים null במקום לזרוק שגיאה
//         return of(null);
//       }
//       else{
//       // כל שאר השגיאות (500 וכו') – כן נזרוק אותם הלאה
//       throw err;
//       }
//     })
//   );
// }


// getLatestDesignByParkAndFeature(parkId: number, featureId: number): Observable<ParkDesignDTO | null> {
//     console.log('🔵 Calling API:', `http://localhost:8080/getLatestDesignByParkAndFeature/${parkId}/${featureId}`);
//   console.log('🔵 withCredentials:', true);
//   return this._httpClient.get<ParkDesignDTO>(
//     `http://localhost:8080/getLatestDesignByParkAndFeature/${parkId}/${featureId}`,
//     { withCredentials: true }
//   ).pipe(
//     catchError(err => {
//       if (err.status === 404 || err.status === 401) {
//         return of(null);                 // ← 404 → נטפל בשקט, מחזירים null
//       }
//       // כל דבר אחר (401, 500, וכו') – נזרוק הלאה כדי שיופיע בקונסול / error handler
//       return throwError(() => err);
//     })
//   );
// }


getLatestDesignsForPark(parkId: number): Observable<ParkDesignDTO[]> {
  return this._httpClient.get<ParkDesignDTO[]>(`http://localhost:8080/api/parkDesign/getLatestDesignsForPark/${parkId}`,
  //  { withCredentials: true }
  );
}




//   addParkDesign(data: Partial<ParkDesign>): Observable<ParkDesignDTO> { 
//     // עכשיו הטיפוס הוא Partial<ParkDesign>, והשגיאה ב-TS תיעלם
//     return this._httpClient.post<ParkDesignDTO>(`http://localhost:8080/api/parkDesign/addParkDesign`, data);
// }
}
