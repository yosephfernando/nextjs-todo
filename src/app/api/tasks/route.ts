import { NextResponse } from "next/server";
import { CreateNewTask, DeleteTask, UpdateTask } from "@/services/task";
import { Task } from "@/core/domain/task";


export async function POST(request: Request) {
    const body = await request.json();
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

export async function PUT(request: Request) {
    const body = await request.json();
    const taskToUpdate: Task = new Task(body.task);
    const taskToEdit: Task = new Task(body.taskToEdit);
    try {
        const updatedTask = UpdateTask(taskToUpdate.task, taskToEdit.task);
        return NextResponse.json(updatedTask);
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