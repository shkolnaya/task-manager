import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects-page/projects.service';
import { Project } from '../projects-page/project.interface';
import { StatisticsServiceService } from './statistics-service.service';
import { CompleteProject } from './projects-statistics/complete-project';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit{
  
  completeProjects: CompleteProject[];
  loading: boolean = false;

  constructor(private statsService: StatisticsServiceService){}
  
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
