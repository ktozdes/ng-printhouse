import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Plate } from 'src/app/models/plate';
import { PlateUser } from 'src/app/models/plate-user';
import { NgForm } from '@angular/forms';
import { PlateService } from 'src/app/services/plate.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  user: User = new User();
  plates: Plate[];
  pricing: PlateUser[];
  ranks: any[] = [
    { id: 0, class: 'has-background-danger'},
    { id: 1, class: 'has-background-grey' },
    { id: 2, class: 'has-background-success' },
  ];
  constructor(
    private userService: UserService,
    private plateService: PlateService,
    private permissionGuard: PermissionGuard,
    private router: Router,
  ) {
    this.user.trust = '1';
    this.user.active = '1';
    if (this.permissionGuard.showMenuItem('profile edit additional')) {
      this.getPlates();
    }
  }

  ngOnInit() {
  }

  onNotify(trustID: number): void {
    this.user.trust = trustID.toString();
  }

  getPlates() {
    this.plateService.list().subscribe({
      next: (res: any) => {
        this.plates = res.plates;
        this.pricing = this.plates.map(plate => {
          return {
            id: plate.id,
            name: plate.name,
            price: plate.price
          };
        });
        console.log(this.plates);
      },
      error: null,
      complete: () => {
      }
    });
  }

  onSubmit(f: NgForm): void {
    if (this.user.repeatPassword !== this.user.password) {
      f.form.controls.repeatPassword.setErrors({mismatch: true});
      return ;
    }
    if (!this.user.name || !this.user.company || !this.user.phone1 || !this.user.repeatPassword || !this.user.password) {
      console.log('no submit');
      return ;
    }
    this.userService.store(this.user, this.pricing).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/user/']);
      },
      error: null,
      complete: () => {
      }
    });
  }
}
