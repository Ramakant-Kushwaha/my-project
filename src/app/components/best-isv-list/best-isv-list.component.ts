import { Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-best-isv-list',
  templateUrl: './best-isv-list.component.html',
  styleUrls: ['./best-isv-list.component.css'],
})
export class BestIsvListComponent {
  public chart: any;

  ngOnInit() {
    this.chart = new Chart('MyChart', {
      type: 'pie', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ['2022-05-15', '2022-05-16', '2022-05-17'],
        datasets: [
          {
            label: 'Sales',
            data: ['467', '576', '572', '79', '92', '574', '573', '576'],
            backgroundColor: 'green',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
