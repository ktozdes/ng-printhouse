import { createAction, props } from '@ngrx/store';
import { Message } from 'src/app/models/message';

export const getMessages = createAction(
  '[Message] Get messages',
  props<{}>()
);

export const setMessage = createAction(
    '[Message] Set Message',
    props<{ message: Message }>()
);

export const destroyMessages = createAction(
    '[Message] Destroy Messages',
);
