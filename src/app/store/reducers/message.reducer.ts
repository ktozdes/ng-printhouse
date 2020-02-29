import { createReducer, on, Action  } from '@ngrx/store';
import { Message } from 'src/app/models/message';
import * as AuthActions from '../actions/user.actions';

export interface MessageState {
  message?: Message[];
}

export const initialState: MessageState = {
    message: [],
};

const messageReducers = createReducer(
  initialState,
  on(AuthActions.getThisUserSuccess, (state, { user, permissions }) => (
    { ...state, user, permissions})),
);


export function messageReducer(state = initialState, action: Action): MessageState {
  return messageReducers(state, action);
}
