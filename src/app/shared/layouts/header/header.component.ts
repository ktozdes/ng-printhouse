import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { Message } from 'src/app/models/message';

import { Store } from '@ngrx/store';
import { userState } from 'src/app/store/app-state';
import { logout } from 'src/app/store/actions/auth.actions';
import {MessageService} from 'src/app/services/message.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  routerLoading: boolean;
  showBurgerMenu = false;

  thisUser: User;
  constructor(
    private store: Store <any>,
    private messageService: MessageService
    ) {
      const getState = this.store.select(userState);
      getState.subscribe((state) => {
        this.thisUser = state.user;
      });
    }

  ngOnInit() {
  }
  toggleBurgerMenu(): void {
    this.showBurgerMenu = !this.showBurgerMenu;
  }

  addMessage() {
    const newMessage = {
      message: 'Hello world',
      messageType: 'success'
    };
    this.messageService.setMessage( newMessage );
  }

  logOut() {
    this.store.dispatch(logout({}));
  }

}
