import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';

import { Store } from '@ngrx/store';
import { userState } from 'src/app/store/app-state';
import { getThisUser } from 'src/app/store/actions/user.actions';
import { logout } from 'src/app/store/actions/auth.actions';

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
    private store: Store <any>
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
    console.log(this.showBurgerMenu);
  }

  logOut() {
    this.store.dispatch(logout({}));
  }

}
