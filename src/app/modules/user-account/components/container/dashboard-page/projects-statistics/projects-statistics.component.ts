import { Component, Input, OnInit } from '@angular/core';
import { CompleteProject } from './complete-project';

@Component({
  selector: 'app-projects-statistics',
  templateUrl: './projects-statistics.component.html',
  styleUrls: ['./projects-statistics.component.scss']
})
export class ProjectsStatisticsComponent implements OnInit{

  @Input()
  completeProject: CompleteProject

  completePercent: number;

  ngOnInit(): void {
    setTimeout(() => {
      this.completePercent = this.countPercent();

    }, 200)
  }

  countPercent(): number{
    return this.completeProject.completedTasksInProjectCount / this.completeProject.tasksInProjectCount * 100
  }
}
