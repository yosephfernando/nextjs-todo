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
            <p>{taskData.title}</p>
        </div>
    );
};

export default ListItemTask;