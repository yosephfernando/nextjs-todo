import { LocalJsonDB } from "../plugins/local-json-db";
import { User } from "../core/domain/user";
import { UserRepository } from "../interfaces/user-repository";

const db = new LocalJsonDB<User>("users");

export class JsonUserRepository implements UserRepository {
    SaveUserToDB(user: User) {
        db.add(user);
        return user;
    }

    GetUserByNameFromDB(username: string): User[] {
        return db.getBy("username", username);
    }
}