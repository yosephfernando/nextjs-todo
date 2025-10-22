import { TaskData } from "@/interfaces/task";
import { LocalJsonDB } from "@/plugins/local-json-db";
import { Task } from "@/core/domain/task";
import { AddTask } from "@/core/use-cases/add-task";

const db = new LocalJsonDB<Task>("task");

export function SaveTaskToDB(taskData: TaskData){
    const addTask = AddTask(taskData)
    db.add(addTask);
    return addTask;
}

export function GetTaskFromDB(){
    const task = db.getAll();
    return task;
}