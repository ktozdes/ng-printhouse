import { Component, OnInit } from '@angular/core';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { ChartsModule } from 'ng2-charts';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private permissionGuard: PermissionGuard) { }
  public SystemName: string = 'MF1';
  firstCopy = false;

  // data
  public lineChartData: Array<number> = [ 1, 8, 30];

  public labelMFL: Array<any> = [
      { data: this.lineChartData,
        label: this.SystemName
      }
  ];
  // labels
  public lineChartLabels: Array<any> = ['2018-01-29 10:00:00', '2018-01-29 10:27:00', '2018-01-29 10:28:00'];
  public lineChartOptions: any = {
    responsive: true,
    scales : {
      yAxes: [{
        // ticks: {
        //   max : 60,
        //   min : 0,
        // }
      }],
      xAxes: [{
      }],
    },
    plugins: {
      datalabels: {
        display: true,
        align: 'top',
        anchor: 'end',
        color: '#222',

        font: {
          family: 'FontAwesome',
          size: 14
        },

      },
      deferred: false
    },
  };

  public ChartType = 'bar';

  ngOnInit() {
  }

  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }

}
