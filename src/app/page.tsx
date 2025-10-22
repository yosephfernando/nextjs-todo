"use client";
import React from "react";
import { TaskData } from "@/interfaces/task";
import ListItemTask from "@/features/task/ListItemTask";
import ViewTask from "@/features/task/ViewTask";
import FormTask from "@/features/task/FormTask";
import { useTasks } from "@/features/task/hooks/UseTask";

export default function Home() {
  const { tasks, loading, error, refresh, newTask, removeTask } = useTasks();
  const [selectedTask, setSelectedTask] = React.useState<TaskData | null>(null);
  const [showForm, setShowForm] = React.useState(false);

  const saveTask = (task: TaskData) => {
    newTask(task).then(data => {
      console.log('Task saved:', data);
      setShowForm(false);
      refresh();
    }).catch(err => {
      console.error('Error saving task:', err);
    });
  };

  const deleteTask = (taskParam: TaskData) => {
    removeTask(taskParam).then(data => {
      console.log('Task deleted:', data);
      setSelectedTask(null);
      refresh();
    }).catch(err => {
      console.error('Error deleting task:', err);
    });
  };

  return (
    <>
      <h1 className="text-2xl font-bold p-4">My task list</h1>
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="flex flex-col md:w-1/3">
            {tasks.length > 0 ? tasks.map((task, index) => (
              <ListItemTask taskData={task} key={index} clicked={setSelectedTask}  />
            )): <p>No tasks found.</p>}
            <button onClick={() => setShowForm(!showForm)} className="mt-4 p-2 bg-blue-500 text-white rounded cursor-pointer">+ Create new</button>
        </div>
        <ViewTask taskData={selectedTask!} deleteTask={deleteTask} />
      </div>
      {showForm && (
        <FormTask 
          onClose={() => setShowForm(!showForm)} 
          saveTask={saveTask} 
        />
      )}
    </>
  );
}
