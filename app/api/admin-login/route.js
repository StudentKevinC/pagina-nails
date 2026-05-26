import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const body = await request.json()
    const password = body.password?.trim()
    const adminPassword = process.env.ADMIN_PASSWORD?.trim()

    if (!adminPassword) {
      return NextResponse.json(
        { success: false, message: "ADMIN_PASSWORD no está configurada" },
        { status: 500 }
      )
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { success: false, message: "Contraseña incorrecta" },
        { status: 401 }
      )
    }

    const response = NextResponse.json({ success: true })

    response.cookies.set("admin_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    })

    return response
  } catch (error) {
    console.error("Error en admin-login:", error)

    return NextResponse.json(
      { success: false, message: "Error interno del servidor" },
      { status: 500 }
    )
  }
}