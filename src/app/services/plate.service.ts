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
export class PlateService {
  constructor(private http: HttpClient,
              private messageService: MessageService) { }
  list(): Observable<any> {
    return this.http.get(`${environment.backendUrl}/plate/list`, {} );
  }
  store(plate: Plate, storage: Storage): Observable<any> {
    return this.http.post(`${environment.backendUrl}/plate/store`, {plate, storage})
    .pipe(
      map((response: any) => {
        console.log('store', response);
        this.messageService.setMessage({message: response.message, messageType: response.status});
        return true;
      }),
      catchError((err, caught) => {
        this.messageService.setMessage({message: err.error.message, messageType: err.error.status});
        return empty();
      })
    );
  }

  edit(plateID: any ): Observable<any> {
    const params = new HttpParams().set('id', plateID.toString());
    return this.http.get(`${environment.backendUrl}/plate/edit`, {params} )
    .pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err, caught) => {
        return empty();
      })
    );
  }

  update(plate: Plate, storage: Storage): Observable<any> {
    return this.http.post(`${environment.backendUrl}/plate/update`, {plate, storage})
    .pipe(
      map((response: any) => {
        this.messageService.setMessage({message: response.message, messageType: response.status});
        return true;
      }),
      catchError((err, caught) => {
        this.messageService.setMessage({message: err.error.message, messageType: err.error.status});
        return empty();
      })
    );
  }

  destroy(id: any): Observable<any> {
    return this.http.post(`${environment.backendUrl}/plate/destroy`, {id} )
    .pipe(
      map((response: any) => {
        this.messageService.setMessage({message: response.message, messageType: response.status});
        return true;
      }),
      catchError((err, caught) => {
        this.messageService.setMessage({message: err.error.message, messageType: err.error.status});
        return empty();
      })
    );
  }
}
