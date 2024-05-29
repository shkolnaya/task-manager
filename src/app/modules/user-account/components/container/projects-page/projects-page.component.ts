import { Component, OnInit } from '@angular/core';
import { Project } from './project.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormComponent } from './project-form/project-form.component';
import { DialogResult } from '../tasks-page/dialog-result';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit{

  constructor(private projectService: ProjectsService, public dialog: MatDialog) {}

  loading: boolean = false;
  projects: Project[];

  ngOnInit(): void {
    this.processData();
  }

  processData(){
    this.loading = true;
    this.projectService.getProjects().subscribe(
      (res)=> {
        this.projects = res;
        this.loading = false;
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
        isNew: isNew
      }
    });
 
    dialogRef.afterClosed().subscribe(result => {
      switch(result?.action) {
        case 'Delete':
          this.processData();
          break;
        case 'Submit':
          if (result.data && result.isNew) {
            this.projectService.createProject(result.data).subscribe(
              result => {
                  this.processData();
              }
            )
          }

          if (result.data && !result.isNew) {
            this.projectService.updateProject(result.data).subscribe(
              result => {
                this.processData();
              }
            );
          }    
          break;
        default:
          
          break;
      }
    });
  }
}
