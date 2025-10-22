import { JsonUserRepository } from "@/repository/user";
import { User } from "@/core/domain/user";

export class AddUser {
  constructor(private repo: JsonUserRepository) {}

  execute(userData: User) {
    if (!userData.credentials.username) throw new Error("username is required");
    if (!userData.credentials.password) throw new Error("password is required");

    const existingUsers = this.repo.GetUserByNameFromDB(userData.credentials.username);
    if (existingUsers.length > 0) throw new Error("username already exists");

    return { user: this.repo.SaveUserToDB(userData) };
  }
}