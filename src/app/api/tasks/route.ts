import { NextResponse } from "next/server";
import { CreateNewTask, FetchAllTasks, DeleteTask } from "@/services/task";
import { Task } from "@/core/domain/task";

export async function GET() {
    const task = FetchAllTasks();
    return NextResponse.json(task);
}

export async function POST(request: Request) {
    const body = await request.json();
    console.log("Received new task:", body);
    const newTask: Task = new Task(body);
    try {
        const savedTask = CreateNewTask(newTask.task);
        return NextResponse.json(savedTask);
    } catch(e: any) {
        return NextResponse.json({
            error: true,
            message: e.message
        });
    }
}

export async function DELETE(request: Request) {
    const body = await request.json();
    const taskToDelete: Task = new Task(body);
    try {
        DeleteTask(taskToDelete);
        return NextResponse.json({ message: "Task deleted successfully" });
    } catch(e: any) {
        return NextResponse.json({
            error: true,
            message: e.message
        });
    }
}