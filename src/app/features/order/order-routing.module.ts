import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderComponent } from './order.component';
import { OrderCreateComponent } from './order-create/order-create.component';

const routes: Routes = [
  {path: '', component: OrderComponent },
  {path: 'create', component: OrderCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
