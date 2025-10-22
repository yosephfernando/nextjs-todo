"use client";

import React from "react";
import { TaskData } from "@/interfaces/task";
import ListItemTask from "@/features/task/ListItemTask";
import ViewTask from "@/features/task/ViewTask";
import FormTask from "@/features/task/FormTask";
import { useTasks } from "@/features/task/hooks/UseTask";
import { useUser } from "@/features/users/hooks/UseUser";

export default function Home() {
  const { tasks, loading, error, refresh, newTask, removeTask } = useTasks();
  const { logout, currUser } = useUser();
  const [selectedTask, setSelectedTask] = React.useState<TaskData | null>(null);
  const [showForm, setShowForm] = React.useState(false);
  const [user, setUser] = React.useState<{ username: string } | null>(null);

  React.useEffect(() => {
    const userData = currUser();
    const formattedName = userData?.username
    ? userData.username.charAt(0).toUpperCase() + userData.username.slice(1).toLowerCase()
    : "";
    setUser({ username: formattedName });
  }, []);

  const saveTask = (task: TaskData) => {
    newTask(task).then(data => {
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
      <h1 className="text-2xl font-bold pl-4 pt-4">
        <strong>{user?.username ?? ''}</strong>'s task list
      </h1>
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="flex flex-col md:w-1/3">
            {tasks.length > 0 ? tasks.map((task, index) => (
              <ListItemTask taskData={task} key={index} isSelected={task === selectedTask} clicked={setSelectedTask}  />
            )): <p>No tasks found.</p>}
            <button onClick={() => setShowForm(!showForm)} className="mt-4 p-2 bg-blue-500 text-white rounded cursor-pointer">+ New task</button>
            <button onClick={() => logout()} className="mt-4 p-2 bg-red-500 text-white rounded cursor-pointer">Logout</button>
        </div>
        <ViewTask taskData={selectedTask == null ? tasks[0] :selectedTask} deleteTask={deleteTask} />
      </div>
      {showForm && (
        <FormTask 
          onClose={() => setShowForm(!showForm)} 
          saveTask={saveTask} 
          currentUser={currUser}
        />
      )}
    </>
  );
}
