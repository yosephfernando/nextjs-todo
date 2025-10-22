import { Task } from "@/core/domain/task";
import { TaskRepository } from "@/interfaces/task-repository";

export class FakeTaskRepository implements TaskRepository {
  private tasks: Task[] = [];

  SaveTaskToDB(task: Task) {
    this.tasks.push(task);
    return task;
  }

  GetTaskFromDB() {
    return this.tasks;
  }

  DeleteTaskFromDB(task: Task) {
    this.tasks = this.tasks.filter(t => t.title !== task.title);
  }
}
