import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[];
  resetPassword = false;
  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.getClientList();
  }

  ngOnInit() {
  }

  getClientList() {
    this.userService.list().subscribe({
      next: (res: any) => {
        this.users = res.users;
      },
      error: null,
      complete: () => {
      }
    });
  }

  edit(id: any) {
    this.router.navigate(['/dashboard/user/edit/', { id }]);
  }

}
