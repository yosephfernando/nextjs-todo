"use client";
import React from "react";
import FormLogin from "@/features/users/FormLogin"
import { useUser } from "@/features/users/hooks/UseUser";

export default function Login(){
    const { error, saved, authUsers } = useUser();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded shadow-md">
                <FormLogin authUser={authUsers} />
                {saved && (<p className="my-4 text-green-600 text-center">User authenticated successfully!</p>)}
                {saved == false && (<p className="my-4 text-red-600 text-center">{error}</p>)}
            </div>
        </div>
    )
}