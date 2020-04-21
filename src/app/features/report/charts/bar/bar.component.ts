import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit, OnChanges {
  @Input()
  data: any;
  @Input()
  title: string;
  @Input()
  showTotal: boolean;

  chartDatasets = [];
  totalValues = [];
  chartType = 'bar';
  chartLegend = true;
  chartLabels: Array<any>;

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
      this.chartDatasets = this.data.value;
      this.chartLabels = this.data.label;
    }
    if (this.showTotal === true) {
      let index = 0;
      this.data.value.forEach(element => {
        this.totalValues[index] = 0;
        element.data.forEach(value => {
          this.totalValues[index] += value;
        });
        index++;
      });
    }

    console.log(this.chartDatasets, this.totalValues);
  }

  ngOnChanges(changes: any) {
    this.changeData();
  }
}
