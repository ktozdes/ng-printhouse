import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { UserService } from 'src/app/services/user.service';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { User } from 'src/app/models/user';
import { Order } from 'src/app/models/order';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  startDate: Date;
  endDate: Date;
  userID = 'all';
  sortBy = 'date_desc';
  statusID = 'all';
  statuses: any[];
  orders: Order[];
  userList: User[];
  page = 1;
  constructor(private reportService: ReportService,
              private userService: UserService,
              private statusService: StatusService,
              private permissionGuard: PermissionGuard) {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    monthAgo.setDate(1);
    this.startDate = monthAgo;
    this.endDate = new Date();
    this.getOrders();
    if (this.permissionGuard.showMenuItem('report user all')) {
      this.getUsers();
      this.getStatuses();
    }

  }
  getOrders() {
    const startDateString = this.startDate.getFullYear() + '/' + (this.startDate.getMonth() + 1) + '/' + this.startDate.getDate() ;
    const endDateString = this.endDate.getFullYear() + '/' + (this.endDate.getMonth() + 1) + '/' + this.endDate.getDate() ;

    this.reportService.order(startDateString, endDateString, this.sortBy, this.statusID, this.userID, this.page).subscribe({
      next: (res: any) => {
        this.orders = (this.page <= 1) ? res.orders.data : this.orders.concat(res.orders.data);
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

  getStatuses() {
    this.statusService.list().subscribe({
      next: (res: any) => {
        this.statuses = res.statuses;
      },
      error: null,
      complete: () => {
      }
    });
  }

  onScroll() {
    this.page++;
    this.getOrders();
  }

  onSubmit() {
    this.page = 1;
    this.getOrders();
  }

  ngOnInit() {
  }

}
