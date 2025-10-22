"use client";

import { useEffect, useState } from "react";
import { TaskData } from "@/interfaces/task";
import { useRouter } from "next/navigation";
import { SessionStorage } from "@/plugins/session-storage";

const sessionStorage = new SessionStorage();

export function useTasks() {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function fetchTasks() {
    try {
      setLoading(true);
      const splitToken = sessionStorage.load("authToken")?.split("-");
      if (!splitToken || splitToken.length < 5) throw new Error("Invalid auth token");

      const res = await fetch("/api/tasks/" + splitToken[4]);
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
    const authToken = sessionStorage.load("authToken");
    if (!authToken) {
      setError("No auth token found");
      setLoading(false);
      router.replace("/auth/login");
      return;
    }
    fetchTasks();
  }, []);

  return { tasks, loading, error, refresh: fetchTasks, newTask: createTask, removeTask: deleteTask };
}