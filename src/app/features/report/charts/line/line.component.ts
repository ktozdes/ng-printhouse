import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit, OnChanges {

  @Input()
  data: any;
  @Input()
  title: string;

  chartDatasets: ChartDataSets[];
  chartType = 'line';
  chartLabels: Label[] = [];

  // options
  chartOptions: any = {
    responsive: true,
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


  constructor() {}

  ngOnInit() {
  }
  changeData() {
    if (this.data) {
      this.chartDatasets = this.data.value.map(obj => ({ ...obj, lineTension: 0 }));
      this.chartLabels = this.data.label;
    }
  }

  ngOnChanges(changes: any) {
    this.changeData();
  }

}

