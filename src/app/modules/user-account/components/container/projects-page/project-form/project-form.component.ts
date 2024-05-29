import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogResult } from '../../tasks-page/dialog-result';
import { Project } from '../project.interface';
import { ProjectsService } from 'src/app/modules/user-account/services/projects.service';


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
  isNew: boolean
  projectToEdit: Project
  projectForm: FormGroup<ProjectForm> = new FormGroup<ProjectForm>({
    name: new FormControl<string>('', Validators.required),
    icon: new FormControl('emoji_events'),
  });

  constructor(
    private projectService: ProjectsService,
    public dialogRef: MatDialogRef<ProjectFormComponent, DialogResult<Project>>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}



  ngOnInit(): void {    
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe(x=> {
      const a = confirm('Are you sure?');
      if (a) {
        this.dialogRef.close({
          action: 'ClickOutside'
        })
      }
    });

    this.projectForm.patchValue(this.data.project);
    this.isNew = this.data.isNew

  }

  submit() {
    if (this.projectForm.valid){
      const projectFormValue = this.projectForm.getRawValue();
      const project: Project = {
        id: this.data.project.id ?? 0,
        name: projectFormValue.name!,
        icon: projectFormValue.icon!,
      }

      this.dialogRef.close({
        data: project,
        action: 'Submit',
        isNew: this.isNew
      });
    }
  }

  deleteProject(){
    this.projectService.deleteProject(this.data.project.id).subscribe();
    this.dialogRef.close({
      data: undefined,
      action: 'Delete'
    });
  }

  cancel() {
    this.dialogRef.close({
      action: 'Cancel'
    });
  }

}
