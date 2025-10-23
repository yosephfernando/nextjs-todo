import { describe, it, expect } from "vitest";
import { AddTask } from "../add-task";
import { FakeTaskRepository } from "../../domain/__test__/task-repository";
import { Task } from "../../domain/task";

describe("AddTask Use Case", () => {
  const repo = new FakeTaskRepository();
  const addTask = new AddTask(repo);

  it("should create new task", () => {
    const task =  new Task({
      title: "task 1",
      description: "desc 1",
      status: "TO_DO",
      username: "john",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    const result = addTask.execute(task);

    expect(result.task.title).toBe("task 1");
    expect(repo.GetTaskFromDB()).toHaveLength(1);
  });

  it("should throw error when title missing", () => {
    expect(() => addTask.execute({ title: "", description: "x" } as Task))
      .toThrow("title is required");
  });
});
