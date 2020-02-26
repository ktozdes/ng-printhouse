import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { register } from 'src/app/store/actions/auth.actions';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { authState} from 'src/app/store/app-state';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  user: User = new User();
  showModal = false;
  popupTitle = 'Chika';
  popupContent = 'rrrrrr';
  errorMessage: string | null;
  errors: [] | null;
  getState: Observable<any>;
  constructor(
    private store: Store <any>) {
      this.getState = this.store.select(authState);
    }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.errors = state.errors;
    });
  }

  onSubmit(f: NgForm): void {
    if (this.user.repeatPassword !== this.user.password) {
      f.form.controls.repeatPassword.setErrors({mismatch: true});
    }
    this.store.dispatch(register({ user: this.user }));
  }
  showModalInfo() {
    this.showModal = true;
  }

}
