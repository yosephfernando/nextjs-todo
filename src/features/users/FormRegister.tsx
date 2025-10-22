"use client";

import { FC } from "react";
import { UserData } from "@/interfaces/user";
import { User } from "@/core/domain/user";

interface FormRegisterPropsType {
    saveUser: (user: UserData) => void;
}

const FormRegister: FC<FormRegisterPropsType> = ({ saveUser }) => {
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const passwordConf = formData.get("password-conf") as string;

        if (!username || !password) {
            alert("Username and password are required.");
            return;
        }

        if(password !== passwordConf) {
            alert("Passwords do not match.");
            return;
        }

        const user = new User();
        user.credentials = { username, password };

        saveUser(user.credentials);
    }

    return (
        <>
            <h2 className="mb-6 text-2xl font-bold text-center">Register</h2>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-4">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your username"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password-conf" className="block mb-2 text-sm font-medium">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="password-conf"
                        name="password-conf"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter password confirmation"
                    />
                </div>
                <div className="my-3">
                    <a href="/auth/login">Back to login</a>
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Register
                </button>
            </form>
        </>
    )
};

export default FormRegister;