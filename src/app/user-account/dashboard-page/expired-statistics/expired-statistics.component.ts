import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
import { StatisticsServiceService } from '../statistics-service.service';
import { ExpiredStatistics } from './expired-statistics';
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

  tasksData: number[]

  chartData: any;

  constructor(private statService: StatisticsServiceService){

  }



  ngOnInit(){
    this.statService.getExpiredStatistics().subscribe(
      res => {
        this.expiredTasksCount = res.expiredTasksCount;
        this.complitedTasksCount = 0;
        this.upcomigTasksCount = res.allTasksCount;

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
            borderWidth: 15,
            offset: 10
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
          legend:
          {position: 'right'}
        }
      }

    })

    
  }

}
