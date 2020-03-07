import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: Order[];
  constructor(private orderService: OrderService,
              private router: Router) {
      this.getOrders();
    }

  ngOnInit() {
  }

  getOrders(): void {
    this.orderService.list().subscribe({
      next: (res: any) => {
        this.orders = res.data;
      },
      error: null,
      complete: () => {
      }
    });
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
