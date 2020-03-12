import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportComponent } from './report.component';
import { OrderComponent } from './order/order.component';
import { BalanceComponent } from './balance/balance.component';
import { StorageComponent } from './storage/storage.component';

const routes: Routes = [
  {path: '', component: ReportComponent },
  {path: 'order', component: OrderComponent },
  {path: 'balance', component: BalanceComponent },
  {path: 'storage', component: StorageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
