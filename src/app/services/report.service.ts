import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Plate } from '../models/plate';
import { Storage } from '../models/storage';
import { Observable, empty } from 'rxjs';
import { map, tap, last, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';



@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private http: HttpClient,
              private messageService: MessageService) { }
  list(): Observable<any> {
    return this.http.get(`${environment.backendUrl}/plate/list`, {} );
  }

  balance(startDate: string, endDate: string, sortBy = '', balanceType = 'all', userID = 'all', page = 0): Observable<any> {
    const params = new HttpParams()
    .set('start_time', startDate)
    .set('end_time', endDate)
    .set('user_id', userID)
    .set('sort_by', sortBy)
    .set('balance_type', balanceType)
    .set('page', page.toString());
    return this.http.get(`${environment.backendUrl}/report/balance`, {params} )
    .pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err, caught) => {
        return empty();
      })
    );
  }

  order(startDate: string, endDate: string, sortBy = '', statusID = 'all', userID = 'all', page = 0): Observable<any> {
    const params = new HttpParams()
    .set('start_time', startDate)
    .set('end_time', endDate)
    .set('user_id', userID)
    .set('sort_by', sortBy)
    .set('status_id', statusID)
    .set('page', page.toString());
    return this.http.get(`${environment.backendUrl}/report/order`, {params} )
    .pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err, caught) => {
        return empty();
      })
    );
  }

  storage(startDate: string, endDate: string, sortBy = '', plateID = 'all', page = 0): Observable<any> {
    const params = new HttpParams()
    .set('start_time', startDate)
    .set('end_time', endDate)
    .set('sort_by', sortBy)
    .set('plate_id', plateID)
    .set('page', page.toString());
    return this.http.get(`${environment.backendUrl}/report/storage`, {params} )
    .pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err, caught) => {
        return empty();
      })
    );
  }
}
