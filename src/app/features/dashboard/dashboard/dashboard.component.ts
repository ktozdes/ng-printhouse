import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { Store } from '@ngrx/store';
import { authState } from 'src/app/store/app-state';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { StatusService } from 'src/app/services/status.service';
import { Plate } from 'src/app/models/plate';
import { PlateService } from 'src/app/services/plate.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  orders: Order[];

  startDate: Date;
  endDate: Date;
  userID = 'all';
  sortBy = 'date_desc';
  statusID = 'all';
  plateID = 'all';
  statuses: any[];
  userList: User[];
  plateList: Plate[];

  page = 1;
  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private statusService: StatusService,
    private plateService: PlateService,
    private store: Store<any>) {
      this.store.select(authState).subscribe((state) => {
        if (typeof state.token === 'string') {
          const monthAgo = new Date();
          monthAgo.setMonth(monthAgo.getMonth() - 6);
          monthAgo.setDate(1);
          this.startDate = monthAgo;
          this.endDate = new Date();
          this.getOrders();
          this.getUsers();
          this.getStatuses();
          this.getPlates();
        }
      });
    }

  ngOnInit() {
  }

  getOrders(): void {
    const startDateString = this.startDate.getFullYear() + '/' + (this.startDate.getMonth() + 1) + '/' + this.startDate.getDate() ;
    const endDateString = this.endDate.getFullYear() + '/' + (this.endDate.getMonth() + 1) + '/' + this.endDate.getDate() ;
    this.orderService.list(
      startDateString, endDateString, this.sortBy, this.statusID, this.userID, this.plateID, this.page
    ).subscribe({
      next: (res: any) => {
        if (this.page <= 1) {
          this.orders = res.data;
        } else if (this.page > 1 && typeof this.orders === 'undefined') {
          this.page = 1;
          this.getOrders();
        } else if (this.page > 1 && typeof this.orders !== 'undefined') {
          this.orders = this.orders.concat(res.data);
        }
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
  getPlates() {
    this.plateService.list().subscribe({
      next: (res: any) => {
        this.plateList = res.plates;
      },
      error: null,
      complete: () => {
      }
    });
  }

  download(orderID: any) {
    const index = this.getOrderIndexByID(orderID);
    window.open(this.orders[index].file.url, '_blank');
    if ( this.orders[index].status.id == '1' ) {
      this.orderService.changeStatus(orderID, 2, 0).subscribe({
        next: (res: any) => {
          this.orders[index].status.id = '2';
        }
      });
    }
  }

  changeStatus(orderID: number, statusID: number) {
    const index = this.getOrderIndexByID(orderID);
    let plateQuantity = 0;
    if (statusID == 3) {
      const repsonse =  prompt('Подтвердите, количество использованных пластин',
        (this.orders[index].storage.quantity).toString());
      plateQuantity = (repsonse === null) ? -1 : parseInt(repsonse, 10);
    }
    if (plateQuantity >= 0) {
      this.orderService.changeStatus(orderID, statusID, plateQuantity).subscribe({
        next: (res: any) => {
          this.orders[index].status.id = statusID.toString();
        }
      });
    }
  }

  destroy(orderID: any) {
    if (confirm('Вы точно хотите удалить этот заказ?')) {
      this.orderService.destroy(orderID).subscribe({
        next: (res: any) => {
          const index = this.getOrderIndexByID(orderID);
          this.orders.splice(index, 1);
        }
      });
    }
  }

  getOrderIndexByID(orderID): number{
    const thisOrder = this.orders.find(order => (order.id == orderID));
    return this.orders.indexOf(thisOrder);
  }

  onSubmit() {
    this.page = 1;
    this.getOrders();
  }

  onScroll() {
    if (typeof this.orders !== 'undefined') {
      this.page++;
      this.getOrders();
    }
}

}
