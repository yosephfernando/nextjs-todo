"use client";
import React from "react";
import FormRegister from "@/features/users/FormRegister";
import { useUser } from "@/features/users/hooks/UseUser";

export default function Register(){
    const { loading, saved, error, newUser } = useUser();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded shadow-md">
                <FormRegister saveUser={newUser} />
                {saved && (<p className="my-4 text-green-600 text-center">User registered successfully!</p>)}
                {saved == false && (<p className="my-4 text-red-600 text-center">{error}</p>)}
            </div>
        </div>
    )
}