"use client";
import { TaskData } from "@/interfaces/task";
import { FC } from "react";

interface ViewTaskProps {
    taskData: TaskData;
    deleteTask: (task: TaskData) => void;
}

const ViewTask: FC<ViewTaskProps> = ({ taskData, deleteTask }) => {
    return (
      <div className="flex flex-col w-full p-4 border rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">Task Details</h2>
        <p>{taskData?.title}</p>
        <p>
          {taskData?.description}
        </p>
        <p>
          created at: {taskData?.createdAt}
        </p>
        <p>
          status: {taskData?.status}
        </p>
        <div className="flex gap-2 mt-4">
          <button className="p-2 bg-green-500 text-white rounded cursor-pointer">Edit</button>
          <button onClick={() => deleteTask(taskData)} className="p-2 bg-red-500 text-white rounded cursor-pointer">Delete</button>
        </div>
      </div>
    );
};

export default ViewTask;