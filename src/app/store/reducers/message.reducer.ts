import { createReducer, on, Action  } from '@ngrx/store';
import { Message } from 'src/app/models/message';
import * as MessageActions from '../actions/message.actions';

export interface MessageState {
  messages?: Message[];
}

export const initialState: MessageState = {
    messages: [],
};

const messageReducers = createReducer(
  initialState,
  on(MessageActions.setMessage, (state, { message }) => {
        const tempMessages = state.messages;
        tempMessages.push( message);
        return { ...state, messages: tempMessages};
    }
    ),
  on(MessageActions.destroyMessages, (state, {}) => ( { ...state, messages : [] })),
);


export function messageReducer(state = initialState, action: Action): MessageState {
  return messageReducers(state, action);
}
