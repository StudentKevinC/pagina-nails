"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()

    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Error al iniciar sesión")
        return
      }

      router.push("/admin")
      router.refresh()
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
      setError("No se pudo conectar con el servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#fff8fb] px-5 py-10 text-[#2b2024]">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="w-full rounded-[2rem] bg-white p-8 shadow-2xl shadow-pink-100"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-[#d96f9b] text-xl font-black text-white">
              JV
            </div>

            <h1 className="text-3xl font-black">
              Panel de Javiera Nails
            </h1>

            <p className="mt-3 text-[#6d5c63]">
              Ingresa la contraseña para administrar los horarios.
            </p>
          </div>

          <label className="mb-2 block font-bold">
            Contraseña
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Escribe la contraseña"
            className="w-full rounded-2xl border border-pink-100 bg-[#fff8fb] px-4 py-3 outline-none focus:border-[#d96f9b]"
          />

          {error && (
            <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-[#d96f9b] px-5 py-4 font-black text-white transition hover:bg-[#c85f8b] disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Entrar al panel"}
          </button>

          <Link
            href="/"
            className="mt-5 block text-center font-black text-[#d96f9b]"
          >
            ← Volver a la página
          </Link>
        </form>
      </div>
    </main>
  )
}