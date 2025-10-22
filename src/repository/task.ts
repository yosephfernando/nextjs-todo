import { LocalJsonDB } from "../plugins/local-json-db";
import { Task } from "../core/domain/task";
import { TaskRepository } from "../interfaces/task-repository";

const db = new LocalJsonDB<Task>("task");

export class JsonTaskRepository implements TaskRepository {
  SaveTaskToDB(task: Task) {
    db.add(task);
    return task;
  }

  GetTaskFromDB(username: string) {
    console.log("Fetching tasks from DB");
    return db.getBy("username", username);
  }

  DeleteTaskFromDB(task: Task) {
    db.delete(task);
  }
}
