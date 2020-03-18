import { Component, OnInit, ɵConsole } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { getThisUser } from 'src/app/store/actions/user.actions';
import { logout } from 'src/app/store/actions/auth.actions';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { PlateService } from 'src/app/services/plate.service';
import { Plate } from 'src/app/models/plate';
import { PlateUser } from 'src/app/models/plate-user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: User;
  plates: Plate[];
  pricing: PlateUser[];
  resetPassword = false;
  ranks: any[] = [
    { id: 0, class: 'has-background-danger'},
    { id: 1, class: 'has-background-grey' },
    { id: 2, class: 'has-background-success' },
  ];
  constructor(
    private userService: UserService,
    private store: Store<any>,
    private permissionGuard: PermissionGuard,
    private route: ActivatedRoute
  ) {
    this.getUser();
  }

  ngOnInit() {
  }

  getUser() {
    const userID = this.route.snapshot.paramMap.get('id');
    this.userService.edit(userID).subscribe({
      next: (res: any) => {
        this.user = res.user;
        if (this.permissionGuard.showMenuItem('profile edit additional')) {
          this.plates = res.plates;
          this.pricing = this.plates.map(plate => {
            const userPrice = (this.user.pricing) ? this.user.pricing.find(price => (price.plate_id == plate.id)) : null;
            plate.price = (userPrice) ? userPrice.price : plate.price;
            return {
              id: plate.id,
              name: plate.name,
              price: plate.price
            };
          });
        }
        console.log(this.user, this.plates, this.pricing);
      }
    });
  }
  onNotify(trustID: number): void {
    this.user.trust = trustID.toString();
  }

  onSubmit(f) {
    if (!this.user.company || !this.user.phone1) {
      console.log('no submit');
      return;
    }

    delete this.user.roles;
    delete this.user.permissions;

    if (!this.resetPassword) {
      delete this.user.repeatPassword;
      delete this.user.password;
    }
    this.userService.update(this.user, this.pricing).subscribe({
      next: (res: any) => {
        if (res.passwordChanged) {
          this.store.dispatch(logout({}));
        } else {
          this.store.dispatch(getThisUser({}));
        }
      },
      error: () => {
        this.getUser();
      },
      complete: () => {
      }
    });
  }

}
