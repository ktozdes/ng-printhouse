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
    return this.store.select(authState).pipe(
      first(),
      flatMap(state => {
        const authReq = !!state.token ? req.clone({
          headers: req.headers.set('Content-Type', 'application/json')
          .set('token', this.token)
        }) : req;
        //console.log('intercept', state, authReq);
        return next.handle(authReq);
      }),
    );
  }
}
