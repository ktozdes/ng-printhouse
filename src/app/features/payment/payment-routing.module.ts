import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentComponent } from './payment.component';
import { DefectComponent } from './defect/defect.component';

const routes: Routes = [
  { path: '', component: PaymentComponent },
  {path: 'defect', component: DefectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
