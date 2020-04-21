import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, SingleDataSet, Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss']
})

export class DoughnutComponent implements OnInit, OnChanges {
  @Input()
  data: any;
  @Input()
  title: string;

  chartType: ChartType = 'doughnut';
  chartDatasets: SingleDataSet = [];
  chartLabels: Label[] = [];
  chartColors: Color[] = [];


  constructor() {}

  ngOnInit() {
  }
  changeData() {
    if (this.data) {
      this.chartDatasets = [
        this.data.value.map( row => row.value )
      ];
      this.chartLabels = this.data.label;

      this.chartColors = [{
        backgroundColor: [
          'rgb(237, 110, 133)',
          '#f8ce6b',
          '#73d05a',
          '#6cbebf',
          '#55a1e5',
          '#916df6',
          '#5aa8d0',
          '#f2a254'],
      }];
    }
  }

  ngOnChanges(changes: any) {
    this.changeData();
  }
}
