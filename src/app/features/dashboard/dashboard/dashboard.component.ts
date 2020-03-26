import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { Store } from '@ngrx/store';
import { authState } from 'src/app/store/app-state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  orders: Order[];
  page = 1;
  constructor(private orderService: OrderService,
              private store: Store<any>) {
      this.store.select(authState).subscribe((state) => {
        if (typeof state.token === 'string') {
          this.getOrders();
        }
      });
    }

  ngOnInit() {
  }

  getOrders(): void {
    this.orderService.list(this.page).subscribe({
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

  onScroll() {
    if (typeof this.orders !== 'undefined') {
      this.page++;
      this.getOrders();
    }
}

}
