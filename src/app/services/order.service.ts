import { Injectable } from '@angular/core';

import { Order } from 'src/app/models/order';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BehaviorSubject, Observable, empty } from 'rxjs';
import { map, tap, last, catchError } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  store(order: Order, fileId: number): Observable<any> {
    return this.http.post(`${environment.backendUrl}/order/store`, {order, file_id: fileId})
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

  list(pageNumber = 0): Observable<any> {
    const params = new HttpParams().set('page', pageNumber.toString());
    return this.http.get(`${environment.backendUrl}/order/list`, {params} )
    .pipe(
      map((response: any) => {
        return response.orders;
      }),
      catchError((err, caught) => {
        return empty();
      })
    );
  }

  edit(orderID: any ): Observable<any> {
    const params = new HttpParams().set("id", orderID.toString());
    return this.http.get(`${environment.backendUrl}/order/edit`, {params} )
    .pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err, caught) => {
        return empty();
      })
    );
  }

  update(order: Order, fileId: number): Observable<any> {
    return this.http.post(`${environment.backendUrl}/order/update`, {order, file_id: fileId})
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

  changeStatus(orderID: any, statusID: any, quantity: number): Observable<any> {
    return this.http.post(`${environment.backendUrl}/order/change_status`, {order_id: orderID, status_id: statusID, quantity})
    .pipe(
      map((response: any) => {
        this.messageService.setMessage({message: response.message, messageType: response.status});
        return response;
      }),
      catchError((err, caught) => {
        this.messageService.setMessage({message: err.error.message, messageType: err.error.status});
        return empty();
      })
    );
  }

  destroy(id: any): Observable<any> {
    return this.http.post(`${environment.backendUrl}/order/destroy`, {id} )
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
