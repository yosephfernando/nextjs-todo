"use client";

import { useEffect, useState } from "react";
import { UserData } from "@/interfaces/user";

export function useUser() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<boolean>(false);

  async function fetchUsers() {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function createUser(user: UserData) {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error("Failed to create user");
      setSaved(true);
      const resBody = await res.json();
      if(resBody.error){
        console.log("Error creating user:", resBody);
        setError(resBody.message);
        setSaved(false);
      }
    } catch (err: any) {
      setSaved(false);
      setError(err.message);
    }
  }

  
  return { users, loading, error, refresh: fetchUsers, newUser: createUser, saved };
}