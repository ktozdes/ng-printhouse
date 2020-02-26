import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const getThisUser = createAction(
  '[User] Get This User',
  props<{}>()
);

export const getThisUserSuccess = createAction(
    '[User] Get This User Success',
    props<{ user: User, permissions: Array<string> }>()
);

export const getThisUserError = createAction(
    '[User] Get This User Error',
    props<{ errorMessage: string }>()
);
