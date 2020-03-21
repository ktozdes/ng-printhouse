import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderComponent } from './order.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { CanDeactivateGuard } from 'src/app/shared/guards/can-deactivate.guard';

const routes: Routes = [
  {path: '', component: OrderComponent },
  {path: 'create', component: OrderCreateComponent, canDeactivate: [CanDeactivateGuard] },
  {path: 'edit', component: OrderEditComponent, canDeactivate: [CanDeactivateGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
