import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const cookieStore = await cookies()
    const token = cookieStore.get('jwtToken')
    if (!token) { // && request.method === "DELETE"
        if (request.nextUrl.pathname.startsWith("/api/users/profile")) {
            return Response.json(
                { message: "not token provided, access denied, from middleware" },
                { status: 401 }  // Unauthorized
            );
        }
    } else {
        if(
            request.nextUrl.pathname === "/login" ||
            request.nextUrl.pathname === "/register"
        ) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
}

export const config = {
    matcher: ['/api/users/profile/:path*', "/login", "/register"],
}