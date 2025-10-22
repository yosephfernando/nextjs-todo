import { UserData } from "@/interfaces/user";
import { JsonUserRepository } from "@/repository/user";
import { AddUser } from "@/core/use-cases/add-user";
// import { GetTask } from "@/core/use-cases/get-task";
// import { RemoveTask } from "@/core/use-cases/remove-task";
import { User } from "@/core/domain/user";

const repo = new JsonUserRepository();

export async function CreateNewUser(userData: UserData) {
    const useCase = new AddUser(repo);
  
    const user = User.create(userData);
  
    const result = useCase.execute(user);
    return result;
}

// export function FetchAllTasks() {
//     const tasks = new GetTask(repo).execute().task;
//     return tasks;
// }

// export function DeleteTask(taskData: TaskData) {
//     const task = new Task(taskData);
//     const useCase = new RemoveTask(repo);
//     useCase.execute(task);
//     return;
// }