import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {

    const jwtToken = request.cookies.get("jwtToken");
    const token = jwtToken?.value as string;

    if (!token) {
        if (request.nextUrl.pathname.startsWith("/api/users/profile/")) {
            return NextResponse.json(
                { message: 'no token provided, access denied' },
                { status: 401 } // Unauthorized
            );
        }
    } else {
        if (
            request.nextUrl.pathname === "/login" ||
            request.nextUrl.pathname === "/register" ||
            request.nextUrl.pathname === "/"
        ) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }
}

export const config = {
    matcher: ["/api/users/profile/:path*", "/login", "/register" , "/"]
}
