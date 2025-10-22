import { describe, it, expect } from 'vitest';
import { GetTask } from '../get-task';
import { FakeTaskRepository } from "../../domain/__test__/task-repository";

describe("GetTask", () => {
    it('Should return list of task', () => {
        const repo = new FakeTaskRepository();
        const taskList = new GetTask(repo).execute().task;
        if(taskList.length > 0){
            expect(taskList[0]).toHaveProperty('title');
            expect(taskList[0]).toHaveProperty('description');
        }
    });
});