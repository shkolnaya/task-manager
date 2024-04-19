import { Injectable } from '@angular/core';
import { Project } from './project.interface';
import { BaseService } from 'src/core/base-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetResult } from 'src/core/interfaces/get-result.interface';

@Injectable()
export class ProjectsService extends BaseService{

  constructor( httpClient: HttpClient) {
    super (httpClient)
   }

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

  getProjects(): Observable<Project[]>{
    return this.getRecords<Project[]>('api/Projects/search', '');
  }


  public getProjectsNames(){
    return this.projects.map(a => a.name);
  }

  getProjectName(id: number){
    return this.projects.find(project => project.id == id)?.name
  }

  getProjectById(id: number): Observable<Project> {
    return this.get<Project>(`api/Projects/${id}`)
  }

  getNextId(): number{
    return this.projects.length + 1;
  }

  createProject(project: Project): Observable<string> {
    return this.post<string>('api/Projects', project)
  }

  updateProject(project: Project): Observable<string> {
    return this.put<string>(`api/Projects/${project.id}`, project)
  }

  deleteProject(projectId: number): Observable<string> {
    return this.delete<string>(`api/Projects/${projectId}`)
  }

}
