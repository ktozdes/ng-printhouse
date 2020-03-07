import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../models/payment';
import { environment } from 'src/environments/environment';
import { Observable, empty } from 'rxjs';
import { map, tap, last, catchError } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  payment: Payment;
  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  store(payment: Payment): Observable<any> {
    return this.http.post(`${environment.backendUrl}/payment/store`, {payment})
    .pipe(
      map((response: any) => {
        console.log('payment store', response);
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
