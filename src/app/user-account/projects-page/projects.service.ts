import { Injectable } from '@angular/core';
import { Project } from './project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor() { }

  projects: Project[] = [
    {
      id: 1,
      name: 'General',
      img: '/assets/icons/clock.svg'
    },
    {
      id: 2,
      name: 'Holiday',
      img: '/assets/icons/clock.svg'
    },
    {
      id: 3,
      name: 'Learning',
      img: '/assets/icons/clock.svg'
    },

  ]

  public getProjects(){
    return this.projects;
  }

  public getProjectsNames(){
    return this.projects.map(a => a.name);
  }

  getProjectName(id: number){
    return this.projects.find(project => project.id === id)?.name
  }


}
