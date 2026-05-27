"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

const services = [
  "Esmaltado permanente",
  "Soft gel",
  "Nivelación base rubber",
  "Nivelación polygel",
  "Baño acrílico",
]

const statusOptions = [
  { value: "available", label: "Disponible" },
  { value: "booked", label: "Ocupado" },
  { value: "hidden", label: "Oculto" },
]

const publicUrl = "https://javiera-nails.netlify.app/"

const formatDate = (dateValue) => {
  if (!dateValue) return "Sin fecha"

  const date = new Date(`${dateValue}T00:00:00`)

  if (Number.isNaN(date.getTime())) return dateValue

  return date.toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })
}

export default function AdminPage() {
  const [appointments, setAppointments] = useState([])
  const [service, setService] = useState(services[0])
  const [date, setDate] = useState("")
  const [time, setTime] = useState("10:00")
  const [status, setStatus] = useState("available")
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [filterDate, setFilterDate] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterService, setFilterService] = useState("all")

  const loadAppointments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("date", { ascending: true })
      .order("time", { ascending: true })

    if (error) {
      alert("Error al cargar horarios")
      console.log(error)
      return
    }

    setAppointments(data || [])
  }

  useEffect(() => {
    loadAppointments()
  }, [])

  const resetForm = () => {
    setService(services[0])
    setDate("")
    setTime("10:00")
    setStatus("available")
    setEditingId(null)
  }

  const saveAppointment = async () => {
    if (!date) {
      alert("Debes seleccionar una fecha.")
      return
    }

    if (!time) {
      alert("Debes seleccionar una hora.")
      return
    }

    setLoading(true)

    if (editingId) {
      const { error } = await supabase
        .from("appointments")
        .update({
          service,
          date,
          time,
          status,
          available: status === "available",
        })
        .eq("id", editingId)

      setLoading(false)

      if (error) {
        alert(`Error: ${error.message}`)
        console.log("Error completo:", error)
        return
      }

      resetForm()
      loadAppointments()
      return
    }

    const { error } = await supabase.from("appointments").insert([
      {
        service,
        date,
        time,
        status,
        available: status === "available",
      },
    ])

    setLoading(false)

    if (error) {
      alert(`Error: ${error.message}`)
      console.log("Error completo:", error)
      return
    }

    resetForm()
    loadAppointments()
  }

  const editAppointment = (appointment) => {
    setEditingId(appointment.id)
    setService(appointment.service)
    setDate(appointment.date)
    setTime(appointment.time)
    setStatus(appointment.status || (appointment.available ? "available" : "hidden"))

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
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

  const updateStatus = async (appointment, newStatus) => {
    const { error } = await supabase
      .from("appointments")
      .update({
        status: newStatus,
        available: newStatus === "available",
      })
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

  const copyPublicLink = async () => {
    await navigator.clipboard.writeText(publicUrl)
    alert("Link copiado")
  }

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const appointmentStatus =
        appointment.status || (appointment.available ? "available" : "hidden")

      const matchesDate = filterDate ? appointment.date === filterDate : true
      const matchesStatus =
        filterStatus === "all" ? true : appointmentStatus === filterStatus
      const matchesService =
        filterService === "all" ? true : appointment.service === filterService

      return matchesDate && matchesStatus && matchesService
    })
  }, [appointments, filterDate, filterStatus, filterService])

  const getStatusLabel = (appointment) => {
    const appointmentStatus =
      appointment.status || (appointment.available ? "available" : "hidden")

    if (appointmentStatus === "available") return "Disponible"
    if (appointmentStatus === "booked") return "Ocupado"
    return "Oculto"
  }

  const getStatusClass = (appointment) => {
    const appointmentStatus =
      appointment.status || (appointment.available ? "available" : "hidden")

    if (appointmentStatus === "available") {
      return "bg-green-100 text-green-700"
    }

    if (appointmentStatus === "booked") {
      return "bg-pink-100 text-pink-700"
    }

    return "bg-zinc-200 text-zinc-600"
  }

  return (
    <main className="page-glow-bg min-h-screen px-5 py-10 text-[#24171D]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="font-black text-[#FF6FAE]">
              ← Volver a la página
            </Link>

            <h1 className="mt-5 text-4xl font-black">Panel de horarios</h1>

            <p className="mt-3 text-[#7D6670]">
              Desde aquí puedes agregar, editar, ocultar o marcar horarios como
              ocupados.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={copyPublicLink}
              className="rounded-full bg-[#FFFDFE] px-5 py-3 font-black text-[#FF6FAE] shadow-lg shadow-pink-100 transition hover:-translate-y-1"
            >
              Copiar link
            </button>

            <button
              onClick={handleLogout}
              className="rounded-full bg-[#24171D] px-5 py-3 font-black text-white transition hover:-translate-y-1"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        <section className="mb-10 rounded-[2rem] bg-[#FFFDFE] p-6 shadow-xl shadow-pink-100">
          <h2 className="mb-5 text-2xl font-black">
            {editingId ? "Editar horario" : "Agregar nuevo horario"}
          </h2>

          <div className="grid gap-4 md:grid-cols-5">
            <div>
              <label className="mb-2 block font-bold">Servicio</label>
              <select
                value={service}
                onChange={(event) => setService(event.target.value)}
                className="w-full rounded-2xl border border-pink-100 bg-[#FFF4F8] px-4 py-3 outline-none"
              >
                {services.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-bold">Fecha</label>
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="w-full rounded-2xl border border-pink-100 bg-[#FFF4F8] px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-bold">Hora</label>
              <input
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="w-full rounded-2xl border border-pink-100 bg-[#FFF4F8] px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-bold">Estado</label>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-2xl border border-pink-100 bg-[#FFF4F8] px-4 py-3 outline-none"
              >
                {statusOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={saveAppointment}
                disabled={loading}
                className="pink-button w-full px-5 py-3 font-black text-white transition hover:-translate-y-1 disabled:opacity-60"
              >
                {loading
                  ? "Guardando..."
                  : editingId
                    ? "Guardar"
                    : "Agregar"}
              </button>

              {editingId && (
                <button
                  onClick={resetForm}
                  className="rounded-2xl bg-zinc-200 px-4 py-3 font-black text-zinc-700"
                >
                  X
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="mb-10 rounded-[2rem] bg-[#FFFDFE] p-6 shadow-xl shadow-pink-100">
          <h2 className="mb-5 text-2xl font-black">Filtros</h2>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block font-bold">Filtrar por fecha</label>
              <input
                type="date"
                value={filterDate}
                onChange={(event) => setFilterDate(event.target.value)}
                className="w-full rounded-2xl border border-pink-100 bg-[#FFF4F8] px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-bold">Filtrar por servicio</label>
              <select
                value={filterService}
                onChange={(event) => setFilterService(event.target.value)}
                className="w-full rounded-2xl border border-pink-100 bg-[#FFF4F8] px-4 py-3 outline-none"
              >
                <option value="all">Todos</option>
                {services.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-bold">Filtrar por estado</label>
              <select
                value={filterStatus}
                onChange={(event) => setFilterStatus(event.target.value)}
                className="w-full rounded-2xl border border-pink-100 bg-[#FFF4F8] px-4 py-3 outline-none"
              >
                <option value="all">Todos</option>
                {statusOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(filterDate || filterStatus !== "all" || filterService !== "all") && (
            <button
              onClick={() => {
                setFilterDate("")
                setFilterStatus("all")
                setFilterService("all")
              }}
              className="mt-5 rounded-full bg-[#FFD6E7] px-5 py-3 font-black text-[#FF6FAE]"
            >
              Limpiar filtros
            </button>
          )}
        </section>

        <section className="rounded-[2rem] bg-[#FFFDFE] p-6 shadow-xl shadow-pink-100">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-black">Horarios creados</h2>

            <p className="font-bold text-[#7D6670]">
              Mostrando {filteredAppointments.length} de {appointments.length}
            </p>
          </div>

          <div className="grid gap-4">
            {filteredAppointments.length === 0 && (
              <p className="text-[#7D6670]">
                No hay horarios con esos filtros.
              </p>
            )}

            {filteredAppointments.map((appointment) => (
              <article
                key={appointment.id}
                className="grid gap-4 rounded-2xl bg-[#FFF4F8] p-5 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto]"
              >
                <div>
                  <p className="text-sm font-bold text-[#7D6670]">Servicio</p>
                  <p className="font-black">{appointment.service}</p>
                </div>

                <div>
                  <p className="text-sm font-bold text-[#7D6670]">Fecha</p>
                  <p className="font-black capitalize">
                    {formatDate(appointment.date)}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-bold text-[#7D6670]">Hora</p>
                  <p className="font-black">{appointment.time}</p>
                </div>

                <div>
                  <p className="text-sm font-bold text-[#7D6670]">Estado</p>
                  <span
                    className={`mt-1 inline-block rounded-full px-4 py-2 text-sm font-black ${getStatusClass(
                      appointment
                    )}`}
                  >
                    {getStatusLabel(appointment)}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => updateStatus(appointment, "available")}
                    className="rounded-full bg-green-100 px-4 py-2 text-sm font-black text-green-700"
                  >
                    Disponible
                  </button>

                  <button
                    onClick={() => updateStatus(appointment, "booked")}
                    className="rounded-full bg-pink-100 px-4 py-2 text-sm font-black text-pink-700"
                  >
                    Ocupado
                  </button>

                  <button
                    onClick={() => updateStatus(appointment, "hidden")}
                    className="rounded-full bg-zinc-200 px-4 py-2 text-sm font-black text-zinc-600"
                  >
                    Oculto
                  </button>

                  <button
                    onClick={() => editAppointment(appointment)}
                    className="rounded-full bg-[#FFD6E7] px-4 py-2 text-sm font-black text-[#FF6FAE]"
                  >
                    Editar
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