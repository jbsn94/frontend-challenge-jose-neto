import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHoliday, IListApiResponse } from 'src/interface/holiday';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(
    private http: HttpClient
  ) { }

  list(country_code: string, year: string | number): Observable<IListApiResponse> {
    return this.http.post<IListApiResponse>(`${environment.url}/holidays/List`, { country_code, year }, {
      headers: {
        Authorization: `Bearer ${environment.key}`,
        'Content-Type': 'application/json'
      }
    })
  }
}