import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';
import {AuthorizationService} from '../../services/authorization.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getThisUser } from '../actions/user.actions';
import { userState } from '../app-state';
//import { PermissionGuard } from 'src/app/shared/guards/permission.guard';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => this.actions$.pipe(
    ofType( AuthActions.login ),
    mergeMap((payload) => this.authorizationService.login(payload.name, payload.password)
      .pipe(
        map(login => {
          return { type: '[Auth] Login Success', token: login.token };
        }),
        catchError((err) => {
          return of({ type: '[Auth] Login Error', errorMessage: err.error.message });
        })
      )
    )
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType( AuthActions.logout ),
    map(() => {
      this.router.navigate(['/auth']);
      localStorage.removeItem('token');
      localStorage.removeItem('login_date');
      return { type: '[Auth] Logout Success' };
    })
  ));

  register$ = createEffect(() => this.actions$.pipe(
    ofType( AuthActions.register ),
    mergeMap((payload) => this.authorizationService.register(payload.user)
      .pipe(
        map(user => {
          this.router.navigateByUrl('/auth');
          return { type: '[Auth] Register Success', successMessage: 'Новый пользователь создан.' };
        }),
        catchError((err) => {
          return of({ type: '[Auth] Register Error',
                      errorMessage: 'Произошла ошибка при регистрации. Проверьте поля.',
                      errors: err.error.errors });
        })
      )
    )
  ));

  signBack$ = createEffect(() => this.actions$.pipe(
    ofType( AuthActions.signBack ),
    mergeMap((payload) => this.authorizationService.signBack(payload.token)
      .pipe(
        map(login => {
          return { type: '[Auth] Login Success', token: login.token, successMessage: 'С Возвращением.' };
        }),
        catchError((err) => {
          return of({ type: '[Auth] Login Error', errorMessage: 'Не правильный логин или пароль.' });
        })
      )
    )
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType( AuthActions.loginSuccess ),
    map((payload) => {
      console.log('[Auth] Login Success', payload);
      localStorage.setItem('token', payload.token);
      localStorage.setItem('login_date', (new Date()).toUTCString() );
      this.store.dispatch(getThisUser({}));
      const sub = this.store.select(userState).subscribe((state) => {
        if (Array.isArray(state.permissions) ) {
          if (state.permissions.indexOf('menu dashboard') >= 0) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/dashboard/order/create']);
          }
          sub.unsubscribe();
        }
      });
      return { type: '[Auth] EMPTY' };
    })
  ));

  loginError$ = createEffect(() => this.actions$.pipe(
    ofType( AuthActions.loginError ),
    map((payload) => {
      localStorage.removeItem('token');
      localStorage.removeItem('login_date');
      this.router.navigate(['/auth']);
      return { type: '[Auth] EMPTY' };
    })
  ));

  constructor(private actions$: Actions,
              private authorizationService: AuthorizationService,
              private store: Store<any>,
              private router: Router
  ) {}
}
