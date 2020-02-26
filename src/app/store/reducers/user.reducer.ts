import { createReducer, on, Action  } from '@ngrx/store';
import { User } from 'src/app/models/user';
import * as AuthActions from '../actions/user.actions';

export const authFeatureKey = 'auth';
export interface UserState {
  user?: User;
}

export const initialState: UserState = {
  user: null,
};

const userReducers = createReducer(
  initialState,
  on(AuthActions.getThisUserSuccess, (state, { user }) => ({ ...state, user})),
  on(AuthActions.getThisUserError, (state, { errorMessage }) => ({ ...state, authenticated: false, user: null, errorMessage })),
);


export function userReducer(state = initialState, action: Action): UserState {
  return userReducers(state, action);
}
