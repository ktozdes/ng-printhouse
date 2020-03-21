import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { authState } from '../store/app-state';
import { first, flatMap } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: string;

  constructor(private store: Store <any>) {
    const getState = this.store.select(authState);
    getState.subscribe((state) => {
        this.token = state.token;
    });
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = !!this.token ? req.clone({
      headers: req.headers.set('Content-Type', 'application/json')
      .set('token', this.token)
    }) : req;
    return next.handle(authReq);
  }
}
