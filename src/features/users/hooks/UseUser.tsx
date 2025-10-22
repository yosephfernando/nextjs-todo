"use client";

import { useEffect, useState } from "react";
import { UserData } from "@/interfaces/user";
import { useRouter } from "next/navigation";
import { SessionStorage } from "@/plugins/session-storage";

const sessionStorage = new SessionStorage();

export function useUser() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<boolean>(false);
  const router = useRouter();

  async function authUsers(user: UserData) {
    try {
      setLoading(true);

      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!res.ok) throw new Error("Authentication failed");

      setSaved(true);

      const resBody = await res.json();

      if(resBody.error){
        setError(resBody.message);
        setSaved(false);
      }

      if(resBody.authenticated === null){
        setError("Invalid username or password");
        setSaved(false);
      }

      if (resBody.authToken) {
        sessionStorage.save("authToken", resBody.authToken);
        router.replace("/");
      }      
    } catch (err: any) {
      setError(err.message);
      setSaved(false);
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
        setError(resBody.message);
        setSaved(false);
      }
    } catch (err: any) {
      setSaved(false);
      setError(err.message);
    }
  }

  function getCurrentUser(): UserData | null {
    const authToken = sessionStorage.load("authToken");
    if (!authToken) return null;

    const splitToken = authToken.split("-");
    if (splitToken.length < 5) return null;

    return {
      username: splitToken[4],
      password: "",
    };
  }

  function logout() {
    sessionStorage.delete("authToken");
    router.replace("/auth/login");
  }

  useEffect(() => {
    const authToken = sessionStorage.load("authToken");
    if (authToken) {
      router.replace("/");
      return;
    }
  }, []);

  return { authUsers, logout, loading, error, newUser: createUser, saved, currUser: getCurrentUser };
}