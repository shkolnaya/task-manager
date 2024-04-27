import { Pipe, PipeTransform } from '@angular/core';
import { ProjectsService } from '../services/projects.service';

@Pipe({
  name: 'projectName'
})
export class ProjectNamePipe implements PipeTransform {

  constructor(private projectService: ProjectsService){}

  transform(value: number): string | undefined {
    return this.projectService.getProjectName(value);
  }

}
