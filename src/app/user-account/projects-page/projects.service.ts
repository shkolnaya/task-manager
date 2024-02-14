import { Injectable } from '@angular/core';
import { Project } from './project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor() { }

  projects: Project[] = [
    {
      name: 'General',
      img: '/assets/icons/clock.svg'
    },
    {
      name: 'Holiday',
      img: '/assets/icons/clock.svg'
    },
    {
      name: 'Learning',
      img: '/assets/icons/clock.svg'
    },

  ]

  public getProjects(){
    return this.projects;
  }


}
