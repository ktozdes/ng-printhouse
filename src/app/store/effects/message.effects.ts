import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as MessageActions from '../actions/message.actions';

@Injectable()
export class MessageEffects {
    getMessages$ = createEffect(() => this.actions$.pipe(
        ofType( MessageActions.getMessages ),
        map((data) => {
            return { type: '[EMPTY]' };
        }),
        catchError((err) => {
            return of({ type: '[Auth] EMPTY'});
        })
    ));

    constructor(private actions$: Actions) {}
}
