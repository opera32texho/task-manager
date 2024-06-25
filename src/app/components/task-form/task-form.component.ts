import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TaskService } from "../../services/task.service";

import { ActivatedRoute, Router } from "@angular/router";
import { ITask } from "src/app/interfaces/task.interface";

@Component({
  selector: "app-task-form",
  templateUrl: "./task-form.component.html",
  styleUrls: ["./task-form.component.scss"],
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  editing = false;
  currentTaskId: string = "";

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.taskForm = new FormGroup({
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
    });

    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.editing = true;
        this.currentTaskId = params["id"];
        const task = this.taskService.getTaskById(this.currentTaskId);
        if (task) {
          this.taskForm.patchValue(task);
        }
      }
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const task: ITask = {
        id: this.editing ? this.currentTaskId : Date.now().toString(),
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
      };

      if (this.editing) {
        this.taskService.updateTask(task);
      } else {
        this.taskService.addTask(task);
      }
      this.router.navigate(["/"]);
    }
  }
}
