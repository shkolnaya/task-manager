import { Component, OnInit } from '@angular/core';
import { Project } from './project.interface';
import { ProjectsService } from './projects.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormComponent } from './project-form/project-form.component';
import { DialogResult } from '../tasks-page/dialog-result';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit{

  constructor(private projectService: ProjectsService, public dialog: MatDialog) {}

  projects: Project[];

  ngOnInit(): void {
    this.processData();
  }

  processData(){
    this.projectService.getProjects().subscribe(
      (res)=> {
        this.projects = res.records
      }
    );
  }

  changeIcon(): void {
    const iconControl = this.projectForm.get('icon');
    iconControl?.setValue('flight');
  }

  projectForm: FormGroup = new FormGroup({
    icon: new FormControl('emoji_events')
  });

  createProject(): void {
    const newProject = {

    } as Project;

    this.openEditTaskDialog(newProject, true);

  }

  editProject(project: Project){
    this.openEditTaskDialog(project, false);
  }

  openEditTaskDialog(currentProject: Project, isNew: boolean): void {
    const dialogRef = this.dialog.open<ProjectFormComponent, any, DialogResult<Project | undefined>>(ProjectFormComponent, {
      width: '500px',
      data: {
        project: currentProject,
        isNewProject: isNew
      }
    });
 
    dialogRef.afterClosed().subscribe(result => {
      switch(result?.action) {
        case 'Submit':
          if (result.data && result.data.id) {
            this.projectService.createProject(result.data);

          }   else {
            // this.projectService.createProject(result.data);
          }  
                 
          break;
        default:
          break;
      }
    });
  }
}
