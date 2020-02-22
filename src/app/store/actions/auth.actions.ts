import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';


export const login = createAction(
  '[Auth] Login',
  props<{ name: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>()
);
export const loginError = createAction(
  '[Auth] Login Error',
  props<{ errorMessage: string }>()
);

export const logout = createAction(
  '[Auth] Logout',
  props<{ name: string; password: string }>()
);
export const logoutExpire = createAction(
  '[Auth] Logout Expire',
  props<{}>()
);
export const logoutSuccess = createAction(
  '[Auth] Logout Success',
  props<{ name: string; password: string }>()
);
export const logoutError = createAction(
  '[Auth] Logout Error',
  props<{ errorMessage: string }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ user: User }>()
);
export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ successMessage: string, user: User }>()
);
export const registerError = createAction(
  '[Auth] Register Error',
  props<{ errorMessage: string, errors: [] }>()
);
export const clearErrorMessages = createAction(
  '[Auth] Clear Error Messages',
  props<{ errorMessage: string, errors: [] }>()
);
export const clearSuccessMessages = createAction(
  '[Auth] Clear Success Messages',
  props<{ successMesssage: string}>()
);
