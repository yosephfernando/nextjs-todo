import { User } from "../domain/user";
import { UserData } from "../../interfaces/user";

export function AddUser(userData: UserData): User {
    if(userData.username === ""){
        throw new Error("username is required");
    }

    if(userData.password === ""){
        throw new Error("password is required");
    }

    const user = new User();
    user.credentials = userData;
    return user;
} 