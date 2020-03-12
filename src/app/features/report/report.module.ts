import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { OrderComponent } from './order/order.component';
import { BalanceComponent } from './balance/balance.component';
import { StorageComponent } from './storage/storage.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatFormFieldModule, MatInputModule, MAT_DATE_LOCALE} from '@angular/material';


@NgModule({
  declarations: [ReportComponent, OrderComponent, BalanceComponent, StorageComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    InfiniteScrollModule,
    FormsModule,

    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' }
  ]
})
export class ReportModule { }
