import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { Payment } from 'src/app/models/payment';
import { UserService } from 'src/app/services/user.service';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-payment',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  startDate: Date;
  endDate: Date;
  userID = 'all';
  sortBy = 'date_desc';
  balanceType = 'all';
  payments: Payment[];
  userList: User[];
  page = 1;
  constructor(private reportService: ReportService,
              private userService: UserService,
              private permissionGuard: PermissionGuard) {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    monthAgo.setDate(1);
    this.startDate = monthAgo;
    this.endDate = new Date();
    this.getPayments();
    if (this.permissionGuard.showMenuItem('report user all')) {
      this.getUsers();
    }

  }
  getPayments() {
    const startDateString = this.startDate.getFullYear() + '/' + (this.startDate.getMonth() + 1) + '/' + this.startDate.getDate() ;
    const endDateString = this.endDate.getFullYear() + '/' + (this.endDate.getMonth() + 1) + '/' + this.endDate.getDate() ;

    this.reportService.balance(startDateString, endDateString, this.sortBy, this.balanceType, this.userID, this.page).subscribe({
      next: (res: any) => {
        this.payments = (this.page <= 1) ? res.payments.data : this.payments.concat(res.payments.data);
      },
      error: null,
      complete: () => {
      }
    });
  }

  getUsers() {
    this.userService.list().subscribe({
      next: (res: any) => {
        this.userList = res.users;
      },
      error: null,
      complete: () => {
      }
    });
  }

  onScroll() {
    this.page++;
    this.getPayments();
  }
  ngOnInit() {
  }

  onSubmit() {
    this.page = 1;
    this.getPayments();
  }

}
