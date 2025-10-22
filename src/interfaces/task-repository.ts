import { Task } from "../core/domain/task";

export interface TaskRepository {
  SaveTaskToDB(task: Task): Task;
  GetTaskFromDB(): Task[];
  DeleteTaskFromDB(task: Task): void;
}
