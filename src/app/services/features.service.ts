import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Feature from '../models/feature.model';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  constructor(private _httpClient: HttpClient) { }


    getFeatures(): Observable<Feature[]> {
      return this._httpClient.get<Feature[]>('http://localhost:8080/api/features/getFeatures',
        { withCredentials: true }

      );
    }
}
