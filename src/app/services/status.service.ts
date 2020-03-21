import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { map, tap, last, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';



@Injectable({
  providedIn: 'root'
})
export class StatusService {
  constructor(private http: HttpClient,
              private messageService: MessageService) { }
  list(): Observable<any> {
    return this.http.get(`${environment.backendUrl}/status/list`, {} );
  }
}
