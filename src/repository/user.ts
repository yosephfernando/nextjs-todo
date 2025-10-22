import { UserData } from "@/interfaces/user";
import { LocalJsonDB } from "@/plugins/local-json-db";
import { User } from "@/core/domain/user";
import { AddUser } from "@/core/use-cases/add-user";

const db = new LocalJsonDB<User>("users");

export function SaveUserToDB(userData: UserData){
    const addUser = AddUser(userData)
    db.add(addUser);
    return addUser;
}

export function GetUserFromDB(){
    const users = db.getAll();
    return users;
}