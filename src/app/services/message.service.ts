import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Message } from 'src/app/models/message';
import { messageState } from 'src/app/store/app-state';
import { setMessage, destroyMessages} from 'src/app/store/actions/message.actions';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private store: Store<any>) {
  }

  getMessages(): Observable<any> {
    return this.store.select(messageState);
  }

  setMessage(message: Message): void {
    this.store.dispatch(setMessage({message}));
  }

  destroyMessage(): void {
    this.store.dispatch(destroyMessages());
  }
}
