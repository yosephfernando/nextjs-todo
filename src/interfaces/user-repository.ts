import { User } from "../core/domain/user";

export interface UserRepository {
  SaveUserToDB(user: User): User;
  GetUserByNameFromDB(username: string): User[];
}
