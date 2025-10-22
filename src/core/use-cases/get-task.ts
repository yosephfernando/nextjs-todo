import { JsonTaskRepository } from "@/repository/task";

export class GetTask {
  constructor(private repo: JsonTaskRepository) {}

  execute() {
    return { task: this.repo.GetTaskFromDB() };
  }
}