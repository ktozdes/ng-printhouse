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
  checkLoginExpiration(): void {
    const loginDateString = localStorage.getItem('login_date');
    if (loginDateString) {
      const loginDate = new Date(loginDateString);
      const todayDate = new Date();
      const diffTime = Math.abs(todayDate.getTime() - loginDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 1) {
        console.log('logout expire');
        localStorage.removeItem('login_date');
        localStorage.removeItem('token');
      }
    }
  }
}
