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
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { BarComponent } from './charts/bar/bar.component';
import { DoughnutComponent } from './charts/doughnut/doughnut.component';
import { LineComponent } from './charts/line/line.component';
import { ManagerComponent } from './manager/manager.component';


@NgModule({
  declarations: [ReportComponent, OrderComponent, BalanceComponent, StorageComponent, BarComponent, DoughnutComponent, LineComponent, ManagerComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    InfiniteScrollModule,
    FormsModule,
    SharedModule,

    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ChartsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' }
  ]
})
export class ReportModule { }
