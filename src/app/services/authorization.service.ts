import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from '../enviroments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) {
  }
  login(email:string, password:string) {
  loginByPassword(username, password): any {
    return this.http.post(`${environment.auth}/admin/signin`, {
      username,
      password
    } as LoginByPasswordDataToServer, {
      params
    });
  }
}
