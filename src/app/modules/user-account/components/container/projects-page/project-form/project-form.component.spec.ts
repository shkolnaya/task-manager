import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFormComponent } from './project-form.component';
import { ProjectsService } from 'src/app/modules/user-account/services/projects.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogResult } from '../../tasks-page/dialog-result';
import { Project } from '../project.interface';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { PickIconComponent } from '../pick-icon/pick-icon.component';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



fdescribe('ProjectFormComponent', () => {
  const project = {
    id: 1,
    name: "test project",
    icon: 'test_icon'
  } as Project

  let component: ProjectFormComponent;
  let fixture: ComponentFixture<ProjectFormComponent>;
  let matDialogRef: jasmine.SpyObj<MatDialogRef<ProjectFormComponent>>;
  let dialogData: any;

  beforeEach(async () => {
    const matDialogSpy = jasmine.createSpyObj<MatDialogRef<ProjectFormComponent>>(
      "MatDialogRef<ProjectFormComponent>", 
      ['backdropClick']);

    await TestBed.configureTestingModule({
      declarations: [ 
        ProjectFormComponent,
        PickIconComponent
      ],
      imports: [MatFormFieldModule, MatInputModule, BrowserAnimationsModule, ReactiveFormsModule],
      providers: [
        {
          provide: ProjectsService,
          useValue: {}
        },
        {
          provide: MatDialogRef<ProjectFormComponent>,
          useValue: matDialogSpy
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            project: project
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectFormComponent);
    component = fixture.componentInstance;

    matDialogRef = TestBed.inject(MatDialogRef<ProjectFormComponent>) as jasmine.SpyObj<MatDialogRef<ProjectFormComponent>>;
    matDialogRef.backdropClick.and.returnValue(of());

    dialogData = TestBed.inject(MAT_DIALOG_DATA);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit initialize matDialogRef corretly', () => {
    fixture.detectChanges();
    expect(matDialogRef.disableClose).toBeTrue();
    expect(matDialogRef.backdropClick).toHaveBeenCalledTimes(1);
  });

  it('ngOnInit initialize FormGroup corretly', () => {
    const fieldNames = [{
      name: 'name',
      value: ''
     }, {
      name: 'icon',
      value: 'emoji_events'
     }];

    fieldNames.forEach(field => {
      const control = component.projectForm.get(field.name);
      expect(control).toBeTruthy();
      expect(control?.value).toBe(field.value);
    });
  });

  it('ngOnInit FormGroup pathValue should be called with dialog data', () => {
    const patchValueSpy = spyOn(component.projectForm, 'patchValue');
    fixture.detectChanges();

    expect(component.projectForm.patchValue).toHaveBeenCalledOnceWith(project)
  });

  it('ngOnInit set isNew=true from dialog data', () => {
    dialogData.isNew = true;
    fixture.detectChanges();

    expect(component.isNew).toBeTrue();
  });

  it('ngOnInit set isNew=false from dialog data', () => {
    dialogData.isNew = false;
    fixture.detectChanges();

    expect(component.isNew).toBeFalse();
  });
});
