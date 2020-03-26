import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { NgxUploaderModule } from 'ngx-uploader';
import { YesNoPipe } from 'src/app/pipes/yes-no.pipe';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    OrderComponent,
    YesNoPipe,
    OrderEditComponent,
    OrderCreateComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    InfiniteScrollModule,
    SharedModule
  ]
})
export class OrderModule { }
