import Image from "next/image";

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-bold p-4">My task list</h1>
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="flex flex-col md:w-1/3">
          <div className="p-4 border rounded shadow-md">
            <p>Task 1</p>
          </div>
          <div className="p-4 border rounded shadow-md">
            <p>Task 2</p>
          </div>
          <div className="p-4 border rounded shadow-md">
            <p>Task 3</p>
          </div>
          <div className="p-4 border rounded shadow-md">
            <p>Task 4</p>
          </div>
        </div>
        <div className="flex flex-col w-full p-4 border rounded shadow-md">
          <p>Task 1</p>
          <p>
            asdasjdkajsd hkajshdkjasd kasjhdkajsd kajshd
          </p>
          <p>
            created at: 2025-01-01
          </p>
          <p>
            status: To Do
          </p>
        </div>
      </div>
    </>
  );
}
