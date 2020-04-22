import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Observable, empty, throwError } from 'rxjs';
import { map, tap, last, catchError } from 'rxjs/operators';
import { MessageService } from './message.service';
import { PlateUser } from '../models/plate-user';

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
  list(): Observable<any> {
    return this.http.get(`${environment.backendUrl}/user/list`);
  }

  listManager(): Observable<any> {
    return this.http.get(`${environment.backendUrl}/user/list_manager`);
  }

  store(user: User, pricing: PlateUser[]): Observable<any> {
    return this.http.post(`${environment.backendUrl}/user/store`, {new_user: user, pricing})
    .pipe(
      map((response: any) => {
        this.messageService.setMessage({message: response.message, messageType: response.status});
        return response;
      }),
      catchError((err, caught) => {
        const values = Object.values(err.error.errors);
        values.map((element, index) => {
          this.messageService.setMessage({message: element[0], messageType: 'error'});
        });
        return throwError(err);
      })
    );
  }

  edit(userID: any ): Observable<any> {
    const params = new HttpParams().set('id', userID.toString());
    return this.http.get(`${environment.backendUrl}/user/edit`, {params} )
    .pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err, caught) => {
        return empty();
      })
    );
  }

  update(user: User, pricing: PlateUser[]): Observable<any> {
    return this.http.post(`${environment.backendUrl}/user/update`, {change_user: user, pricing})
    .pipe(
      map((response: any) => {
        this.messageService.setMessage({message: response.message, messageType: response.status});
        return response;
      }),
      catchError((err, caught) => {
        this.messageService.setMessage({message: err.error.message, messageType: err.error.status});
        return throwError(err);
      })
    );
  }
}
