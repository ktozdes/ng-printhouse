import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { DefectComponent } from './defect/defect.component';


@NgModule({
  declarations: [PaymentComponent, DefectComponent],
  imports: [
    CommonModule,
    FormsModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
