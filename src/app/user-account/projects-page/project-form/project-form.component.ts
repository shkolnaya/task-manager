import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogResult } from '../../tasks-page/dialog-result';
import { Project } from '../project.interface';
import { ProjectsService } from '../projects.service';


interface ProjectForm {
  name: FormControl<string | null>;
  icon: FormControl<string | null>;

}

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit{

  constructor(
    private projectService: ProjectsService,
    public dialogRef: MatDialogRef<ProjectFormComponent, DialogResult<Project>>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      dialogRef.disableClose = true;
      dialogRef.backdropClick().subscribe(x=> {
        const a = confirm('Are you sure?');
        if (a) {
          this.dialogRef.close({
            action: 'ClickOutside'
          })
        }
      })
  }

  projectForm: FormGroup<ProjectForm>;

  ngOnInit(): void {    
    this.projectForm = new FormGroup<ProjectForm>({
      name: new FormControl<string>('', Validators.required),
      icon: new FormControl('emoji_events'),
    })

  }

  submit() {
    if (this.projectForm.valid){
      const projectFormValue = this.projectForm.getRawValue();
      const project: Project = {
        id: this.projectService.getNextId(),
        name: projectFormValue.name!,
        icon: projectFormValue.icon!,
      }

      this.dialogRef.close({
        data: project,
        action: 'Submit'
      });
    }
  }

  cancel() {
    this.dialogRef.close({
      action: 'Cancel'
    });
  }

}
