import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITask } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<ITask[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  addTask(task: ITask) {
    const tasks = this.tasksSubject.getValue();
    tasks.push(task);
    this.tasksSubject.next(tasks);
  }

  deleteTask(id: string) {
    const tasks = this.tasksSubject.getValue().filter((t) => t.id !== id);
    this.tasksSubject.next(tasks);
  }

  toggleTaskCompletion(id: string) {
    const tasks = this.tasksSubject.getValue().map((task) => {
      if (task.id === id) {
        return { ...task, complete: !task.complete };
      }
      return task;
    });
    this.tasksSubject.next(tasks);
  }

  getTaskById(id: string): ITask | undefined {
    return this.tasksSubject.getValue().find((task) => task.id === id);
  }

  updateTask(updatedTask: ITask) {
    const tasks = this.tasksSubject.getValue().map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });
    this.tasksSubject.next(tasks);
  }
}
