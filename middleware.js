import { NextResponse } from "next/server"

export function middleware(request) {
  const { pathname } = request.nextUrl

  const isAdminRoute = pathname.startsWith("/admin")
  const isLoginRoute = pathname === "/admin/login"

  if (!isAdminRoute || isLoginRoute) {
    return NextResponse.next()
  }

  const adminAuth = request.cookies.get("admin_auth")?.value

  if (adminAuth === "true") {
    return NextResponse.next()
  }

  const loginUrl = new URL("/admin/login", request.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ["/admin/:path*"],
}