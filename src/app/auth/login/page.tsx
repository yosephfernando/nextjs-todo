import FormLogin from "@/features/users/FormLogin"

export default function Login(){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded shadow-md">
                <FormLogin />
            </div>
        </div>
    )
}