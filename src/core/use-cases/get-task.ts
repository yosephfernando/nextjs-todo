import { JsonTaskRepository } from "@/repository/task";

export class GetTask {
  constructor(private repo: JsonTaskRepository) {}

  execute(username: string) {
    return { task: this.repo.GetTaskFromDB(username) };
  }
}