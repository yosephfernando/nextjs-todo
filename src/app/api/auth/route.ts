import { NextResponse } from "next/server";
import { AuthUser } from "@/services/user";
import { User } from "@/core/domain/user";

export async function POST(request: Request) {
    const body = await request.json();
    const authUser: User = new User();
    authUser.credentials = {
        username: body.username,
        password: body.password
    }
    try {
        const authenticated = await AuthUser(authUser.credentials.username, authUser.credentials.password);
        const authToken = authenticated ? { authToken: "mock-jwt-token-for-" + authUser.credentials.username } : null;
        return NextResponse.json({authenticated, ...authToken});
    } catch(e: any) {
        return NextResponse.json({
            error: true,
            message: e.message
        });
    }
}