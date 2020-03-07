import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Observable, empty } from 'rxjs';
import { map, tap, last, catchError } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  constructor(private http: HttpClient,
              private messageService: MessageService) { }
  getThisUser(): Observable<any> {
    return this.http.get(`${environment.backendUrl}/show`, {} );
  }
  paymentlist(): Observable<any> {
    return this.http.get(`${environment.backendUrl}/user/paymentlist`);
  }
}
