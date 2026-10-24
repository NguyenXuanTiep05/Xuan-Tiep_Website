import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import apiClient from "./api/client";

export function proxy(request: NextRequest) {
  const isLoggedIn = request.cookies.has("token");
  const { pathname } = request.nextUrl;

  if (pathname == "/") {
    return NextResponse.next();
  }

  if (!isLoggedIn && pathname !== "/login") {
    const loginUrl = new URL("/login", request.url);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.set("callbackUrl", pathname, {
      maxAge: 300,
      httpOnly: false,
      secure: true,
    });
    return response;
  }
  if (isLoggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
