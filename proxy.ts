import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/auth";

export async function proxy(request: NextRequest) {
  const session = await getSession();
  const isDashBoardPage = request.nextUrl.pathname.startsWith("/dashboard");
  if (isDashBoardPage && !session?.user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  const isSignIn = request.nextUrl.pathname.startsWith("/sign-in");
  const isSignOut = request.nextUrl.pathname.startsWith("/sign-up");
  if ((isSignIn || isSignOut) && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}
