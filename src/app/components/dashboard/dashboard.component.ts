import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { IsvListService } from '../services/isv-list.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  public chart: any;
  public selectedChart: any;
  public showChart: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public chartList: string[] = ['Line', 'Bar', 'doughnut', 'Pie'];

  // 'Polar Area'
  constructor(private ivsS: IsvListService) {}

  ngOnInit() {
    this.chartInit();
  }

  public chartInit() {
    this.showChart.next(true);
    const [labels, counts]: any = this.ivsS.getChartLabel();
    console.log(labels);
    console.log(counts);
    this.chart = new Chart('MyChart', {
      type: this.selectedChart.toLowerCase(), //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: labels,
        datasets: [
          {
            label: 'All',
            data: counts,
          },
        ],
      },
      options: {
        aspectRatio: 2.8,
      },
    });
  }

  public onChartChange(chart) {
    if (this.chart) {
      this.chart.destroy();
    }
    this.showChart.next(false);
    this.selectedChart = chart;
    this.chartInit();
  }
}
