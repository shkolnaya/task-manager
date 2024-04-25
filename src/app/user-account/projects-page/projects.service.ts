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


  getProjects(): Observable<Project[]>{
    return this.getRecords<Project[]>('api/Projects/search', '');
  }



  getProjectName(id: number){
    let name = '';
    this.getProjectById(id).subscribe(res => {
      name = res.name;
    })
    return name;
  }

  getProjectById(id: number): Observable<Project> {
    return this.get<Project>(`api/Projects/${id}`)
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
