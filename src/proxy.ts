import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    if (process.env.NODE_ENV === "development") {
        return NextResponse.next();
    }

    const isLoggedIn = request.cookies.has("token");
    const { pathname } = request.nextUrl;

    if (!isLoggedIn && pathname !== "/login") {
        const loginUrl = new URL("/login", request.url);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.set("callbackUrl", pathname, {
            maxAge: 300,
            httpOnly: true,
            secure: true,
        });
        return response;
    }
    if (isLoggedIn && pathname === "/login") {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
