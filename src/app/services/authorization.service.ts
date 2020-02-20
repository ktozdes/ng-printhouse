import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) {
  }
  login(name: string, password: string): Observable<any> {
    return this.http.post(`${environment.backendUrl}/login`, { name, password});
  }
  register(user: User): Observable<any> {
    return this.http.post(`${environment.backendUrl}/register`, user);
  }
  logout() {
    return this.http.get('/movies');
  }
  resetPassword() {
    return this.http.get('/movies');
  }
}
