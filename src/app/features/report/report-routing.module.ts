import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportComponent } from './report.component';
import { OrderComponent } from './order/order.component';
import { BalanceComponent } from './balance/balance.component';
import { StorageComponent } from './storage/storage.component';
import { ManagerComponent } from './manager/manager.component';

const routes: Routes = [
  {path: '', component: ReportComponent },
  {path: 'order', component: OrderComponent },
  {path: 'manager', component: ManagerComponent },
  {path: 'balance', component: BalanceComponent },
  {path: 'storage', component: StorageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
