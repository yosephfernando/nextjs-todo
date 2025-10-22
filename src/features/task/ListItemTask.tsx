"use client";

import { TaskData } from "@/interfaces/task";
import { FC } from "react";

interface ListItemTaskProps {
    taskData: TaskData;
    isSelected: boolean;
    key: number;
    clicked: (task: TaskData) => void;
}

const ListItemTask: FC<ListItemTaskProps> = ({ taskData, clicked, isSelected }) => {
    return (
        <div
            className={`p-4 border rounded shadow-md cursor-pointer ${
                isSelected ? "bg-slate-300 dark:bg-blue-800" : ""
            }`}
            onClick={() => clicked(taskData)}
        >
            <div className="flex justify-between items-center">
                <p>{taskData.title}</p>
                {taskData.status === "TO_DO" && (
                    <h2 className="text-sm font-semibold bg-gray-100 text-gray-800 px-4 py-2 rounded-full shadow-sm inline-block">
                        To Do
                    </h2>
                )}

                {taskData.status === "IN_PROGRESS" && (
                    <h2 className="text-sm font-semibold bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full shadow-sm inline-block">
                        In Progress
                    </h2>
                )}

                {taskData.status === "DONE" && (
                    <h2 className="text-sm font-semibold bg-green-100 text-green-800 px-4 py-2 rounded-full shadow-sm inline-block">
                        Done
                    </h2>
                )}
            </div>
        </div>
    );
};

export default ListItemTask;