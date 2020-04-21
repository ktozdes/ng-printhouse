import { Component, OnInit } from '@angular/core';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { ChartsModule } from 'ng2-charts';
import { ReportService } from 'src/app/services/report.service';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  startDate: Date;
  endDate: Date;
  revenue: Array<any>;
  ordersByUser: Array<any>;
  platesByPopularity: Array<any>;
  salesByMonth: Array<any>;
  constructor(private reportService: ReportService,
              private permissionGuard: PermissionGuard) {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    monthAgo.setDate(1);
    this.startDate = monthAgo;
    this.endDate = new Date();
    this.getChartData();
  }

  getChartData() {
    const startDateString = this.startDate.getFullYear() + '/' + (this.startDate.getMonth() + 1) + '/' + this.startDate.getDate();
    const endDateString = this.endDate.getFullYear() + '/' + (this.endDate.getMonth() + 1) + '/' + this.endDate.getDate();
    this.reportService.getChartData(startDateString, endDateString).subscribe({
      next: (res: any) => {
        this.revenue = res.revenue;
        this.ordersByUser = res.order_by_user;
        this.platesByPopularity = res.plates_by_popularity;
        this.salesByMonth = res.sales_by_month;
        console.log(this.salesByMonth);
      },
      error: null,
      complete: () => {
      }
    });
  }

  ngOnInit() {
  }
  onSubmit() {
    this.getChartData();
  }

}
