import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ReportDTO from '../models/dto/reportDTO.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private _httpClient: HttpClient) {}

  // getReportsByParkId(): Observable<ReportDTO[]> {
  //   return this._httpClient.get<ReportDTO[]>(`http://localhost:8080/api/Reports/getReportsByParkId/${id}`,
  //     {withCredentials: true }
  //   );
  // }

  getReportsByParkId(id: number): Observable<ReportDTO[]> {
      return this._httpClient.get<ReportDTO[]>(`http://localhost:8080/api/reports/getReportsByParkId/${id}`
        // ,{withCredentials: true }
      )
    }

  addReport(parkId: number, formData: FormData): Observable<ReportDTO> {
    return this._httpClient.post<ReportDTO>(
      `http://localhost:8080/api/reports/uploadReport/${parkId}`,
      formData,
      { withCredentials: true }
    );
  }
}
