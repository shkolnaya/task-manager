import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../project.interface';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

  @Input()
  project: Project

  @Output()
  projectToEdit = new EventEmitter<boolean>();

  editProject(event: MouseEvent){
    this.projectToEdit.emit();
    event.preventDefault();
    event.stopPropagation();
  }

}
