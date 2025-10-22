
import { UserData } from "@/interfaces/user"

export class User {
    constructor (
        public username: string = "",
        public password: string = ""
    ) {}

    static create(data: UserData): User {
        return new User(data.username, data.password);
    }

    get credentials(): UserData {
        return {
            username: this.username,
            password: this.password,
        };
    }

    set credentials(data: UserData) {
        this.username = data.username;
        this.password = data.password;
    }
}