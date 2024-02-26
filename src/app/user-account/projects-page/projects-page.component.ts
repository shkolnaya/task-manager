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
    this.projects = this.projectService.getProjects();
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

    this.openEditTaskDialog();

  }

  openEditTaskDialog(): void {
    const dialogRef = this.dialog.open<ProjectFormComponent, any, DialogResult<Project>>(ProjectFormComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      switch(result?.action) {
        case 'Submit':
          if (result.data) {
            this.projectService.createProject(result.data);
            this.processData();
          }           
          break;
        default:
          break;
      }
    });
  }
}
