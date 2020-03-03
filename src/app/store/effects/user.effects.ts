import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as UserActions from '../actions/user.actions';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserEffects {
  getThisUser$ = createEffect(() => this.actions$.pipe(
    ofType( UserActions.getThisUser ),
    mergeMap(() => this.userService.getThisUser()
      .pipe(
        map((data) => {
          return { type: '[User] Get This User Success', user: data.user, permissions: data.permissions };
        }),
        catchError((err) => {
            return of({ type: '[Auth] EMPTY'});
        })
      )
    )
  ));

  constructor(private actions$: Actions,
              private userService: UserService
  ) {}
}
