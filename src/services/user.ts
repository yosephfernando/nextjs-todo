import { UserData } from "@/interfaces/user";
import { JsonUserRepository } from "@/repository/user";
import { AddUser } from "@/core/use-cases/add-user";
import { GetUser } from "@/core/use-cases/get-user";
import { User } from "@/core/domain/user";

const repo = new JsonUserRepository();

export async function CreateNewUser(userData: UserData) {
    const useCase = new AddUser(repo);
  
    const user = User.create(userData);
  
    const result = useCase.execute(user);
    return result;
}

export function AuthUser(username: string, password: string) {
    const user = new GetUser(repo).execute(username).user;
    if (user.length === 0) {
        return null;
    }
    if (user[0].password === password) {
        return user[0];
    }
    return null;
}