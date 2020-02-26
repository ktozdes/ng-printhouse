
import {ActionReducerMap} from '@ngrx/store';
import { AuthState, authReducer } from './reducers/auth.reducer';
import { UserState, userReducer } from './reducers/user.reducer';

export interface AppState {
    authState: AuthState;
    userState: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
    authState: authReducer,
    userState: userReducer,
};

export const authState = (state: AppState) => state.authState;
export const userState = (state: AppState) => state.userState;
