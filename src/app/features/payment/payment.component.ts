import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  userList: User[] = [];
  selectedUser: User;
  payment: Payment = new Payment();
  constructor(private userService: UserService,
              private paymentService: PaymentService,
              private router: Router) {
    this.getClientList();
  }
  getClientList() {
    this.userService.list().subscribe({
      next: (res: any) => {
        this.userList = res.users;
        //this.router.navigate(['/dashboard/storage']);
      },
      error: null,
      complete: () => {
      }
    });
  }
  ngOnInit() {
  }

  onChange(userID: string) {
    this.selectedUser = this.userList.find(tempUser => tempUser.id.toString() === userID.toString());
    this.payment.user_id = this.selectedUser.id;
  }

  onSubmit(): void {
    if (!this.selectedUser || !this.payment.amount ) {
      console.log('no submit');
      return ;
    }
    this.paymentService.store(this.payment).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => {
          this.router.navigate(['dashboard/payment']);
        });
      },
      error: null,
      complete: () => {
      }
    });
  }

}
