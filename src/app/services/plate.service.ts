import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plate } from '../models/plate';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlateService {
  constructor(private http: HttpClient) { }
  list(): Observable<any> {
    return this.http.get(`${environment.backendUrl}/plate/list`, {} );
  }
}
