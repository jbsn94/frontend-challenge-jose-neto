import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IListApiResponse } from 'src/interface/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<IListApiResponse> {
    return this.http.post<IListApiResponse>(`${environment.url}/holidays/Countries`, {});
  }
}
