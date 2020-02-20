
import {ActionReducerMap} from '@ngrx/store';
import { AuthState, authReducer } from './reducers/auth.reducer';

export interface AppState {
    authState: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
    authState: authReducer
};

export const authState = (state: AppState) => state.authState;
