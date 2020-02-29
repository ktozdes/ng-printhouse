import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { NgxUploaderModule } from 'ngx-uploader';



@NgModule({
  declarations: [
    OrderComponent,
    OrderCreateComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule
  ]
})
export class OrderModule { }
