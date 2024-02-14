import { Component, OnInit } from '@angular/core';
import { Project } from './project.interface';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit{

  constructor(private projectService: ProjectsService) {}

  projects: Project[];

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
    console.log(this.projects)
  }
}
