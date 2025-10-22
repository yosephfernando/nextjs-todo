import { TaskData } from "@/interfaces/task";

export class Task {
  public title: string;
  public description: string;
  public status: "TO_DO" | "IN_PROGRESS" | "DONE";
  public username: string;
  public createdAt: string;
  public updatedAt: string;

  constructor(data: TaskData) {
    this.title = data.title;
    this.description = data.description;
    this.status = data.status ?? "TO_DO";
    this.username = data.username ?? "";
    this.createdAt = data.createdAt ?? new Date().toISOString();
    this.updatedAt = data.updatedAt ?? new Date().toISOString();
  }

  static create(data: Omit<TaskData, "createdAt" | "updatedAt">): Task {
    return new Task({
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

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

  update(data: Partial<TaskData>) {
    if (data.title) this.title = data.title;
    if (data.description) this.description = data.description;
    if (data.status) this.status = data.status;
    if (data.username) this.username = data.username;
    this.updatedAt = new Date().toISOString();
  }

  equals(other: Task): boolean {
    return this.title === other.task.title && this.username === other.task.username;
  }
}