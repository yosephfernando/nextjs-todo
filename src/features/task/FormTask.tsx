"use client";

import { FC } from "react";
import { TaskData } from "@/interfaces/task";
import { Task } from "@/core/domain/task";
import { UserData } from "@/interfaces/user";

interface FormTaskPropsType {
    onClose: () => void;
    saveTask: (task: TaskData, taskToEdit?: TaskData) => void;
    currentUser: () => UserData | null;
    taskToEdit: TaskData | null;
}

const FormTask: FC<FormTaskPropsType> = ({ onClose, saveTask, currentUser, taskToEdit }) => {
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const status = formData.get("status") as "TO_DO" | "IN_PROGRESS" | "DONE";
        const username = currentUser()?.username || "unknown";
        const createdAt = formData.get("createdAt") as string;
        const updatedAt = formData.get("updatedAt") as string;

        const task = new Task({
            title,
            description,
            status,
            username,
            createdAt,
            updatedAt,
        });

        if(taskToEdit){
            saveTask(task.task, taskToEdit);
        }else{
            saveTask(task.task);
        }
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="p-6 bg-white dark:bg-slate-800 border rounded-2xl shadow-lg w-full max-w-lg relative">
                <form className="mt-4 space-y-4" onSubmit={(e) => onSubmit(e)}>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            defaultValue={taskToEdit ? taskToEdit.title : ''}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={taskToEdit ? taskToEdit.description : ''}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            defaultValue={taskToEdit ? taskToEdit.status : 'TO_DO'}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="TO_DO">To Do</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="DONE">Done</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="createdAt" className="block text-sm font-medium">
                            Created At
                        </label>
                        <input
                            type="datetime-local"
                            id="createdAt"
                            name="createdAt"
                            defaultValue={
                                taskToEdit && taskToEdit.createdAt
                                ? new Date(
                                    new Date(taskToEdit.createdAt).getTime() -
                                    new Date(taskToEdit.createdAt).getTimezoneOffset() * 60000
                                    )
                                    .toISOString()
                                    .slice(0, 16)
                                : ''
                            }
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="updatedAt" className="block text-sm font-medium">
                            Updated At
                        </label>
                        <input
                            type="datetime-local"
                            id="updatedAt"
                            name="updatedAt"
                            defaultValue={
                                taskToEdit && taskToEdit.updatedAt
                                ? new Date(
                                    new Date(taskToEdit.updatedAt).getTime() -
                                    new Date(taskToEdit.updatedAt).getTimezoneOffset() * 60000
                                    )
                                    .toISOString()
                                    .slice(0, 16)
                                : ''
                            }
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                        <button
                            onClick={onClose}
                            type="button"
                            className="px-4 py-2 bg-gray-300 dark:bg-slate-400 rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormTask;