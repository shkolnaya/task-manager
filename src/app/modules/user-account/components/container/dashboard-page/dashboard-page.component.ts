import { Component, OnInit } from '@angular/core';
import { StatisticsService } from './statistics.service';
import { CompleteProject } from './projects-statistics/complete-project';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit{
  
  completeProjects: CompleteProject[];
  loading: boolean = false;

  constructor(private statsService: StatisticsService){}
  
  ngOnInit(): void {
    this.loading = true;
    this.statsService.getProjectsStatistics().subscribe(
      res =>
      {
        this.completeProjects = res;
        this.loading = false;
      }
    )
  }

  

}
