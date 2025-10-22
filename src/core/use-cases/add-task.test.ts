import { describe, it, expect } from 'vitest';
import { AddTask } from './add-task';

describe("AddTask", () => {
    it('Should create new task', () => {
        const newTask = AddTask({
            title: "task 1",
            description: "desc of task 1",
            status: "TO_DO",
            username: "john",
            createdAt: new Date().getUTCDate().toLocaleString(),
            updatedAt: new Date().getUTCDate().toLocaleString()
        });
        expect(newTask.task.title).toBe("task 1");
        expect(newTask.task.description).toBe("desc of task 1");
    });

    it('Should return error: title is required', () => {
        expect(() => AddTask({
            title: "",
            description: "doe"
        })).toThrowError("title is required");
    });

    it('Should return error: description is required', () => {
        expect(() => AddTask({
            title: "john",
            description: ""
        })).toThrowError("description is required");
    });
});