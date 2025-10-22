import { NextResponse } from "next/server";
import { SaveTaskToDB, GetTaskFromDB } from "@/services/task";
import { Task } from "@/core/domain/task";

export async function GET() {
    const task = GetTaskFromDB();
    return NextResponse.json(task);
}

export async function POST(request: Request) {
    const body = await request.json();
    const newTask: Task = new Task();
    newTask.task = {
        title: body.title,
        description: body.description,
        status: "TO_DO"
    }
    try {
        const savedTask = SaveTaskToDB(newTask.task);
        return NextResponse.json(savedTask);
    } catch(e: any) {
        return NextResponse.json({
            error: true,
            message: e.message
        });
    }
}