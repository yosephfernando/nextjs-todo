import { Task } from "../domain/task";
import { TaskData } from "../../interfaces/task";

export function AddTask(taskData: TaskData): Task {
    if(taskData.title === ""){
        throw new Error("title is required");
    }

    if(taskData.description === ""){
        throw new Error("description is required");
    }

    const task = new Task();
    task.task = taskData;
    return task;
} 