import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../task-form/task-form.component';

@Component({
  selector: 'app-add-task-button',
  templateUrl: './add-task-button.component.html',
  styleUrls: ['./add-task-button.component.scss']
})
export class AddTaskButtonComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
