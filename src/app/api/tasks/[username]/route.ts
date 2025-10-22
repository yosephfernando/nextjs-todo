import { NextResponse, NextRequest  } from "next/server";
import { FetchAllTasks } from "@/services/task";

export async function GET(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const parts = pathname.split("/");
    const username = parts[parts.length - 1];
    const task = FetchAllTasks(username);
    return NextResponse.json(task);
}