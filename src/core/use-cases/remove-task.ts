import { TaskRepository } from "@/interfaces/task-repository";
import { Task } from "@/core/domain/task";

export class RemoveTask {
  constructor(private repo: TaskRepository) {}

  execute(taskData: Task) {
    if (!taskData.title) throw new Error("title is required");
    if (!taskData.description) throw new Error("description is required");
    return { task: this.repo.DeleteTaskFromDB(taskData) };
  }
}
