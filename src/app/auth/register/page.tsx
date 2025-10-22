export default function Register(){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center">Register</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
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
            </div>
        </div>
    )
}