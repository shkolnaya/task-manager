import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
import { StatisticsServiceService } from '../statistics-service.service';
import { htmlLegendPlugin } from '../html-legend-functions';
import * as moment from 'moment';
Chart.register(...registerables);

@Component({
  selector: 'app-calendar-statistics',
  templateUrl: './calendar-statistics.component.html',
  styleUrls: ['./calendar-statistics.component.scss']
})
export class CalendarStatisticsComponent implements OnInit{

  chartData: any;

  weekStart: moment.Moment;
  weekEnd: moment.Moment;

  daysOfWeek: String[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]

  constructor(private statService: StatisticsServiceService){

  }

  ngOnInit(){

    this.getDates();

    const start = this.weekStart.toISOString();

    this.statService.getCalendarStatistics(
      {
        'minDate': this.weekStart.toISOString(),
        'maxDate': this.weekEnd.toISOString()
      }
    ).subscribe(res => {
      this.chartData = {
        labels: this.daysOfWeek,
        datasets: [
          {
            label: 'Created tasks',
            data: res.createdTasks,
            fill: false,
            borderColor: '#BB0C75',
            backgroundColor: '#BB0C75',
            tension: 0.1,
            pointBackgroundColor: 'transparent'
          },
          {
            label: 'Done tasks',
            data: res.completedTasks,
            fill: false,
            borderColor: '#690176',
            backgroundColor: '#690176',
            tension: 0.1,
            pointBackgroundColor: 'transparent'
          },
          {
            label: 'Created projects',
            data: res.createdProjects,
            fill: false,
            borderColor: '#d511f4',
            backgroundColor: '#d511f4',
            tension: 0.1,
            pointBackgroundColor: 'transparent'
          },
        ],
      };

      this.renderChart();
    })

  }

  getDates(){
    this.weekStart = moment.utc().startOf('isoWeek');
    this.weekEnd = moment(this.weekStart).add(6, 'd');
  }

  renderChart(){
    const pieChart = new Chart ('chart', {
      type: 'line',
      data: this.chartData,
      options: {
        plugins: {
          htmlLegend: {
            containerID: 'legend-container-calendar'
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
