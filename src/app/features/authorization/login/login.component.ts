import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { AppState, authState} from 'src/app/store/app-state';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;
  constructor(private store: Store <any>
    ) {
      this.getState = this.store.select(authState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      console.log(state);
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    this.store.dispatch(login({ name: this.user.name, password: this.user.password }));
  }

}
