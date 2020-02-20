import { createReducer, on, Action  } from '@ngrx/store';
import { User } from 'src/app/models/user';
import * as AuthActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';


export interface AuthState {
  // boolean if user is authenticated
  authenticated: boolean;
  testing: number;
  // the authenticated user
  token?: string;
  user?: User;
  errorMessage: string | null;
}

export const initialState: AuthState = {
  authenticated: false,
  testing: 0,
  token: null,
  user: null,
  errorMessage: null
};

const authReducers = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token }) => ({ ...state, authenticated: true, token, errorMessage: null})),
  on(AuthActions.loginError, (state, { errorMessage }) => ({ ...state, authenticated: false, errorMessage })),
  on(AuthActions.logout, state => ({ ...state, testing: 3})),
  on(AuthActions.register, state => ({ ...state, testing: 4 })),
);


export function authReducer(state = initialState, action: Action): AuthState {
  return authReducers(state, action);
}
