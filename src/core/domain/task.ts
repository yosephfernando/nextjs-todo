
import { TaskData } from "@/interfaces/task"

export class Task {
    constructor (
        private title: string = "",
        private description: string = "",
        private status: "TO_DO" | "IN_PROGRESS" | "DONE" = "TO_DO",
        private username: string = "",
        private createdAt: string = "",
        private updatedAt: string = ""
    ) {}

    get task(): TaskData {
        return {
            title: this.title,
            description: this.description,
            status: this.status,
            username: this.username,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    set task(data: TaskData) {
       this.title = data.title;
       this.description = data.description;
       this.createdAt = data.createdAt ?? this.createdAt;
       this.updatedAt = data.updatedAt ?? this.updatedAt;
       this.status = data.status ?? this.status;
       this.username = data.username ?? this.username;
    }
}