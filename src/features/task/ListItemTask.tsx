"use client";

import { TaskData } from "@/interfaces/task";
import { FC } from "react";

interface ListItemTaskProps {
    taskData: TaskData;
    key: number;
    clicked: (task: TaskData) => void;
}

const ListItemTask: FC<ListItemTaskProps> = ({ taskData, clicked }) => {
    return (
        <div className="p-4 border rounded shadow-md cursor-pointer" onClick={() => clicked(taskData)}>
            <p>{taskData.title}</p>
        </div>
    );
};

export default ListItemTask;