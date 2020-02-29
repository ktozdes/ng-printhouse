
import {ActionReducerMap} from '@ngrx/store';
import { AuthState, authReducer } from './reducers/auth.reducer';
import { UserState, userReducer } from './reducers/user.reducer';
import { MessageState, messageReducer } from './reducers/message.reducer';

export interface AppState {
    authState: AuthState;
    userState: UserState;
    messageState: MessageState;
}

export const reducers: ActionReducerMap<AppState> = {
    authState: authReducer,
    userState: userReducer,
    messageState: messageReducer,
};

export const authState = (state: AppState) => state.authState;
export const userState = (state: AppState) => state.userState;
export const messageState = (state: AppState) => state.messageState;
