"use client";

import React from "react";
import { TaskData } from "@/interfaces/task";
import ListItemTask from "@/features/task/ListItemTask";
import ViewTask from "@/features/task/ViewTask";
import FormTask from "@/features/task/FormTask";
import { useTasks } from "@/features/task/hooks/UseTask";
import { useUser } from "@/features/users/hooks/UseUser";

export default function Home() {
  const { tasks, refresh, newTask, updateTask, removeTask } = useTasks();
  const { logout, currUser } = useUser();
  const [ selectedTask, setSelectedTask ] = React.useState<TaskData | null>(null);
  const [ showForm, setShowForm ] = React.useState(false);
  const [ user, setUser ] = React.useState<{ username: string } | null>(null);
  const [ taskFiltered, setTaskFiltered ] = React.useState<TaskData[]>([]);

  React.useEffect(() => {
    const userData = currUser();
    const formattedName = userData?.username
    ? userData.username.charAt(0).toUpperCase() + userData.username.slice(1).toLowerCase()
    : "";
    setUser({ username: formattedName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (tasks.length > 0) {
      setSelectedTask(tasks[0]);
      setTaskFiltered(tasks);
    }
  }, [tasks]);

  const saveTask = (task: TaskData, taskToEdit: TaskData | null = null) => {
    if(taskToEdit){
      updateTask(task, taskToEdit).then(data => {
        console.log('Task updated:', data);
        setShowForm(false);
        refresh();
      }).catch(err => {
        console.error('Error updating task:', err);
      });
      return;
    }
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
      setSelectedTask(tasks[0]);
      refresh();
    }).catch(err => {
      console.error('Error deleting task:', err);
    });
  };

  const toggleFormTask = (isUpdate: boolean = false) => {
    setShowForm(!showForm)
    if(!isUpdate){
      setSelectedTask(null);
    }
  };

  const filterTasksByStatus = (status: string) => {
    if (status === "ALL") {
      setTaskFiltered(tasks);
    } else {
      const filtered = tasks.filter(task => task.status === status);
      setTaskFiltered(filtered);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold pl-4 pt-4">
        <strong>{user?.username ?? ''}</strong>&lsquo;s task list
      </h1>
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="flex flex-col md:w-1/3">
          <div className="flex items-center flex-wrap gap-2 mb-4 cursor-pointer">
            <h2 onClick={() => filterTasksByStatus("ALL")} className="text-sm font-semibold bg-gray-100 text-gray-800 px-4 py-2 rounded-full shadow-sm">
              All
            </h2>
            <h2 onClick={() => filterTasksByStatus("TO_DO")} className="text-sm font-semibold bg-gray-500 text-gray-800 px-4 py-2 rounded-full shadow-sm">
              To Do
            </h2>
            <h2 onClick={() => filterTasksByStatus("IN_PROGRESS")} className="text-sm font-semibold bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full shadow-sm">
              In Progress
            </h2>
            <h2 onClick={() => filterTasksByStatus("DONE")} className="text-sm font-semibold bg-green-100 text-green-800 px-4 py-2 rounded-full shadow-sm">
              Done
            </h2>
          </div>
          
          {tasks.length > 0 ? taskFiltered.map((task, index) => (
            <ListItemTask taskData={task} key={index} isSelected={task === selectedTask} clicked={setSelectedTask}  />
          )): <p>No tasks found.</p>}

          <button onClick={() => toggleFormTask()} className="mt-4 p-2 bg-blue-500 text-white rounded cursor-pointer">+ New task</button>
          <button onClick={() => logout()} className="mt-4 p-2 bg-red-500 text-white rounded cursor-pointer">Logout</button>
        </div>
        <ViewTask
          toggleForm={() => toggleFormTask(true)}
          taskData={selectedTask ?? null}
          deleteTask={deleteTask}
        />
      </div>
      {showForm && (
        <FormTask 
          onClose={() => toggleFormTask(true)} 
          saveTask={saveTask} 
          currentUser={currUser}
          taskToEdit={selectedTask}
        />
      )}
    </>
  );
}
