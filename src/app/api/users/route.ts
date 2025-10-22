import { NextResponse } from "next/server";
import { CreateNewUser } from "@/services/user";
import { User } from "@/core/domain/user";

export async function POST(request: Request) {
    const body = await request.json();
    const newUser: User = new User();
    newUser.credentials = {
        username: body.username,
        password: body.password
    }
    try {
        const savedUser = await CreateNewUser(newUser.credentials);
        return NextResponse.json(savedUser);
    } catch(e: any) {
        return NextResponse.json({
            error: true,
            message: e.message
        });
    }
}