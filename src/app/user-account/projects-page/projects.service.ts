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
      icon: 'group'
    },
    {
      id: 2,
      name: 'Holiday',
      icon: 'flight'
    },
    {
      id: 3,
      name: 'Learning',
      icon: 'school'
    },

  ]

  public getProjects(){
    return this.projects;
  }

  public getProjectsNames(){
    return this.projects.map(a => a.name);
  }

  getProjectName(id: number){
    return this.projects.find(project => project.id == id)?.name
  }

  getProjectById(id: number): Project{
    return this.projects.find(project => project.id == id) as Project
  }

  getNextId(): number{
    return this.projects.length + 1;
  }

  createProject(project: Project){
    this.projects.push(project)
  }

  deleteProject(projectId: number){
    this.projects = this.projects.filter((project) => {
      return project.id != projectId
    })
  }

}
