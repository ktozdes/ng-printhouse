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
  errorMessage: string | null;
  successMessage: string | null;
  errors?: [];
}

export const initialState: AuthState = {
  authenticated: false,
  testing: 0,
  token: null,
  errorMessage: null,
  successMessage: null,
  errors: []
};

const authReducers = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token }) => ({ ...state, authenticated: true, token, errorMessage: null})),
  on(AuthActions.loginError, (state, { errorMessage }) => ({ ...state, authenticated: false, token: null, errorMessage })),
  on(AuthActions.signBackSuccess, (state, { token }) => ({ ...state, authenticated: true, token, errorMessage: null})),
  on(AuthActions.signBackError, (state, { errorMessage }) => ({ ...state, authenticated: false, token: null, errorMessage })),

  on(AuthActions.logoutSuccess, (state, {}) => ({ ...state, authenticated: false, token: null, errorMessage: null, successMessage: null })),
  on(AuthActions.logoutError, (state, { errorMessage }) => ({ ...state, authenticated: true, errorMessage})),
  on(AuthActions.logoutExpire, state => ({ ...state, authenticated: false, token: null, user: null})),

  on(AuthActions.register, state => ({ ...state, testing: 4 })),
  on(AuthActions.registerSuccess, (state, { successMessage }) => ({ ...state, successMessage, errorMessage: null, errors: null})),
  on(AuthActions.registerError, (state, { errorMessage, errors }) => ({ ...state, errorMessage, errors })),
);


export function authReducer(state = initialState, action: Action): AuthState {
  return authReducers(state, action);
}
