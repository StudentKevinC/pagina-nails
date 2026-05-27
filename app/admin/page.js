"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export const dynamic = "force-dynamic"

const services = [
  "Manicure permanente",
  "Soft gel",
  "Diseños personalizados",
  "Retiro y cuidado",
]

const days = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
]

export default function AdminPage() {
  const [appointments, setAppointments] = useState([])
  const [service, setService] = useState(services[0])
  const [date, setDate] = useState(days[0])
  const [time, setTime] = useState("10:00")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadAppointments = async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("id", { ascending: false })

      if (error) {
        alert("Error al cargar horarios")
        console.log(error)
        return
      }

      setAppointments(data || [])
    }

    loadAppointments()
  }, [])

  const loadAppointments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("id", { ascending: false })

    if (error) {
      alert("Error al cargar horarios")
      console.log(error)
      return
    }

    setAppointments(data || [])
  }

  const addAppointment = async () => {
    if (!time) {
      alert("Debes seleccionar una hora.")
      return
    }

    setLoading(true)

    const { error } = await supabase.from("appointments").insert([
      {
        service,
        date,
        time,
        available: true,
      },
    ])

    setLoading(false)

    if (error) {
      alert(`Error: ${error.message}`)
      console.log("Error completo:", error)
      return
    }

    setTime("10:00")
    loadAppointments()
  }

  const deleteAppointment = async (id) => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar este horario?")

    if (!confirmDelete) return

    const { error } = await supabase.from("appointments").delete().eq("id", id)

    if (error) {
      alert("Error al eliminar horario")
      console.log(error)
      return
    }

    loadAppointments()
  }

  const toggleAvailable = async (appointment) => {
    const { error } = await supabase
      .from("appointments")
      .update({ available: !appointment.available })
      .eq("id", appointment.id)

    if (error) {
      alert("Error al actualizar disponibilidad")
      console.log(error)
      return
    }

    loadAppointments()
  }

  const handleLogout = async () => {
    await fetch("/api/admin-logout", {
      method: "POST",
    })

    window.location.href = "/admin/login"
  }

  return (
    <main className="min-h-screen bg-[#fff8fb] px-5 py-10 text-[#2b2024]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="font-black text-[#d96f9b]">
              ← Volver a la página
            </Link>

            <h1 className="mt-5 text-4xl font-black">
              Panel de horarios
            </h1>

            <p className="mt-3 text-[#6d5c63]">
              Desde aquí puedes agregar, ocultar o eliminar horarios disponibles
              para la agenda.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-full bg-[#1f171b] px-5 py-3 font-black text-white transition hover:-translate-y-1"
          >
            Cerrar sesión
          </button>
        </div>

        <section className="mb-10 rounded-[2rem] bg-white p-6 shadow-xl shadow-pink-100">
          <h2 className="mb-5 text-2xl font-black">
            Agregar nuevo horario
          </h2>

          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="mb-2 block font-bold">Servicio</label>
              <select
                value={service}
                onChange={(event) => setService(event.target.value)}
                className="w-full rounded-2xl border border-pink-100 bg-[#fff8fb] px-4 py-3 outline-none"
              >
                {services.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-bold">Día</label>
              <select
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="w-full rounded-2xl border border-pink-100 bg-[#fff8fb] px-4 py-3 outline-none"
              >
                {days.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-bold">Hora</label>
              <input
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="w-full rounded-2xl border border-pink-100 bg-[#fff8fb] px-4 py-3 outline-none"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={addAppointment}
                disabled={loading}
                className="w-full rounded-2xl bg-[#d96f9b] px-5 py-3 font-black text-white transition hover:bg-[#c85f8b] disabled:opacity-60"
              >
                {loading ? "Agregando..." : "Agregar"}
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-pink-100">
          <h2 className="mb-5 text-2xl font-black">
            Horarios creados
          </h2>

          <div className="grid gap-4">
            {appointments.length === 0 && (
              <p className="text-[#6d5c63]">
                Todavía no hay horarios creados.
              </p>
            )}

            {appointments.map((appointment) => (
              <article
                key={appointment.id}
                className="grid gap-4 rounded-2xl bg-[#fff8fb] p-5 md:grid-cols-[1fr_1fr_1fr_auto]"
              >
                <div>
                  <p className="text-sm font-bold text-[#7a646d]">Servicio</p>
                  <p className="font-black">{appointment.service}</p>
                </div>

                <div>
                  <p className="text-sm font-bold text-[#7a646d]">Día</p>
                  <p className="font-black">{appointment.date}</p>
                </div>

                <div>
                  <p className="text-sm font-bold text-[#7a646d]">Hora</p>
                  <p className="font-black">{appointment.time}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => toggleAvailable(appointment)}
                    className={`rounded-full px-4 py-2 text-sm font-black ${
                      appointment.available
                        ? "bg-green-100 text-green-700"
                        : "bg-zinc-200 text-zinc-600"
                    }`}
                  >
                    {appointment.available ? "Disponible" : "Oculto"}
                  </button>

                  <button
                    onClick={() => deleteAppointment(appointment.id)}
                    className="rounded-full bg-red-100 px-4 py-2 text-sm font-black text-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}