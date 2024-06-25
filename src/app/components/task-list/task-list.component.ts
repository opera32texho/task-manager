import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { ITask } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<ITask[]>;
  displayedColumns: string[] = ['title', 'description', 'complete', 'actions'];
  constructor(private taskService: TaskService, private router: Router) {
    this.tasks$ = this.taskService.tasks$;
  }

  ngOnInit() {}

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  toggleTaskCompletion(id: string) {
    this.taskService.toggleTaskCompletion(id);
  }

  navigateToAdd() {
    this.router.navigate(['/add-task']);
  }

  navigateToEdit(id: string) {
    this.router.navigate(['/edit-task', id]);
  }
}
