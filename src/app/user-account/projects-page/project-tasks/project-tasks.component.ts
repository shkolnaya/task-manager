import { Component } from '@angular/core';
import { Task } from '../../tasks-page/task/task.interface';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../tasks-page/task.service';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.scss']
})
export class ProjectTasksComponent {
  tasks: Task[];

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      let id = params['id'];
      this.tasks = this.taskService.getProjectTasks(id)
    });
  }
}
