import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
import { StatisticsService } from '../statistics.service';
import { htmlLegendPlugin } from '../html-legend-functions';
Chart.register(...registerables);

@Component({
  selector: 'app-expired-statistics',
  templateUrl: './expired-statistics.component.html',
  styleUrls: ['./expired-statistics.component.scss']
})
export class ExpiredStatisticsComponent implements OnInit{

  expiredTasksCount: number;
  complitedTasksCount: number;
  upcomigTasksCount: number;

  chartData: any;

  constructor(private statService: StatisticsService){

  }



  ngOnInit(){
    this.statService.getExpiredStatistics().subscribe(
      res => {
        this.expiredTasksCount = res.expiredTasksCount;
        this.complitedTasksCount = res.completedTasksCount;
        this.upcomigTasksCount = res.upcomingTasksCount;

        this.chartData = {
          labels: [
            'Expired',
            'Complited',
            'Upcoming'
          ],
          datasets: [{
            data: [this.expiredTasksCount, this.complitedTasksCount, this.upcomigTasksCount],
            backgroundColor: [
              '#690176',
              '#BB0C75',
              '#d511f4'
            ],
            hoverOffset: 25,
            borderColor: 'transparent',
            borderWidth: 20,
            offset: 0
          }]
        };

        this.renderChart();
      }
    );


    
  };

  renderChart(){
    const pieChart = new Chart ('piechart', {
      type: 'pie',
      data: this.chartData,
      options: {
        plugins: {
          htmlLegend: {
            containerID: 'legend-container-expired'
          },
          legend: {
            display: false
          }
        }
      } as any,
      plugins: [htmlLegendPlugin]
    });    
  }
}


