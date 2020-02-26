import { createReducer, on, Action  } from '@ngrx/store';
import { User } from 'src/app/models/user';
import * as AuthActions from '../actions/user.actions';

export const authFeatureKey = 'auth';
export interface UserState {
  user?: User;
  permissions?: Array<string>;
}

export const initialState: UserState = {
  user: null,
  permissions : null
};

const userReducers = createReducer(
  initialState,
  on(AuthActions.getThisUserSuccess, (state, { user, permissions }) => (
    { ...state, user, permissions})),
  // on(AuthActions.getThisUserError, (state, { errorMessage }) => (
  //   { ...state, authenticated: false, user: null, permissions: null, errorMessage })),
);


export function userReducer(state = initialState, action: Action): UserState {
  return userReducers(state, action);
}
