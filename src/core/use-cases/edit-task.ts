import { JsonTaskRepository } from "@/repository/task";
import { Task } from "@/core/domain/task";

export class EditTask {
  constructor(private repo: JsonTaskRepository) {}

  execute(taskData: Task, taskToEdit: Task) {
    if (!taskData.title) throw new Error("title is required");
    if (!taskData.description) throw new Error("description is required");
    return { task: this.repo.SaveTaskToDB(taskData, taskToEdit) };
  }
}
