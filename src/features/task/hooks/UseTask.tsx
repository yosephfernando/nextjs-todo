"use client";

import { useEffect, useState } from "react";
import { TaskData } from "@/interfaces/task";

export function useTasks() {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchTasks() {
    try {
      setLoading(true);
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function createTask(task: TaskData) {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error("Failed to create task");
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function deleteTask(task: TaskData) {
    try {
      const res = await fetch("/api/tasks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error("Failed to delete task");
    } catch (err: any) {
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, refresh: fetchTasks, newTask: createTask, removeTask: deleteTask };
}