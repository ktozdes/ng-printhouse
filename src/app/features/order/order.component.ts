import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: Order[];
  page = 1;
  constructor(private orderService: OrderService,
              private permissionGuard: PermissionGuard,
              private router: Router) {
      this.getOrders();
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

  onScroll() {
      if (typeof this.orders !== 'undefined') {
        this.page++;
        this.getOrders();
      }
  }

  edit(id: any) {
    this.router.navigate(['/dashboard/order/edit/', { id }]);
  }

  destroy(id: any) {
    if (confirm('Are you sure to delete?')) {
      this.orderService.destroy(id).subscribe({
        next: (res: any) => {
          this.getOrders();
        }
      });
    }
  }
}
