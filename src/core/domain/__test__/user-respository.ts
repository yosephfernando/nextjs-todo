import { User } from "@/core/domain/user";
import { UserRepository } from "@/interfaces/user-repository";

export class FakeUserRepository implements UserRepository {
  private users: User[] = [];

  SaveUserToDB(user: User) {
    this.users.push(user);
    return user;
  }

  GetUserByNameFromDB(username: string) {
    return this.users.filter(u => u.credentials.username === username);
  }
}
