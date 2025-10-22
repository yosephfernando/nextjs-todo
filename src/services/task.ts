import { TaskData } from "@/interfaces/task";
import { JsonTaskRepository } from "@/repository/task";
import { AddTask } from "@/core/use-cases/add-task";
import { GetTask } from "@/core/use-cases/get-task";
import { RemoveTask } from "@/core/use-cases/remove-task";
import { Task } from "@/core/domain/task";

const repo = new JsonTaskRepository();

export async function CreateNewTask(taskData: TaskData) {
    const useCase = new AddTask(repo);
  
    const now = new Date().toISOString();
    const task = Task.create(taskData);
    task.status = task.status || "TO_DO";
    task.createdAt = now;
    task.updatedAt = now;
  
    const result = await useCase.execute(task);
    return result.task;
}

export function FetchAllTasks(username: string) {
    const tasks = new GetTask(repo).execute(username).task;
    return tasks;
}

export function DeleteTask(taskData: TaskData) {
    const task = new Task(taskData);
    const useCase = new RemoveTask(repo);
    useCase.execute(task);
    return;
}