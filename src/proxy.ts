import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import apiClient from "./api/client";
import axios from "axios";
import { API_BASE_URL } from "@/config/api";

async function isLoggedIn(request: NextRequest): Promise<boolean> {
  try {
    await axios.get(`${API_BASE_URL}/auth/verify`, {
      headers: { cookie: request.headers.get("cookie") ?? "" },
    });
    return true;
  } catch {
    return false;
  }
}
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loggedIn = await isLoggedIn(request);

  if (pathname == "/") {
    return NextResponse.next();
  }

  if (!loggedIn && pathname !== "/login") {
    const loginUrl = new URL("/login", request.url);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.set("callbackUrl", pathname, {
      maxAge: 300,
      httpOnly: false,
      secure: true,
    });
    return response;
  }
  if (loggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
