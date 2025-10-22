import { Task } from "../core/domain/task";

export interface TaskRepository {
  SaveTaskToDB(task: Task): Task;
  GetTaskFromDB(username: string): Task[];
  DeleteTaskFromDB(task: Task): void;
}
