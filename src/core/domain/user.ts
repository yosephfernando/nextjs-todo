
import { UserData } from "@/interfaces/user"

export class User {
    constructor (
        private username: string = "",
        private password: string = ""
    ) {}

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