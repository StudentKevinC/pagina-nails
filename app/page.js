"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

const business = {
  name: "Javiera Nails",
  brand: "jaavieranailss",
  owner: "Javiera Valenzuela",
  experience: "Manicurista certificada desde 2020",
  whatsappUrl: "https://wa.me/56977503024",
  instagramUrl: "https://www.instagram.com/jaavieranailss/",
  instagram: "@jaavieranailss",
  phone: "+56 9 7750 3024",
  deposit: "$5.000",
  location: "Honestudio en Santiago, Conchalí",
  note: "No se realizan domicilios",
}

const services = [
  {
    icon: "💅",
    title: "Esmaltado permanente",
    description:
      "Esmaltado de larga duración con preparación de la uña natural, limpieza y terminación prolija.",
    price: "Valor según diseño",
  },
  {
    icon: "✨",
    title: "Soft gel",
    description:
      "Extensión de uñas con tips soft gel, ideal para lograr largo, forma y un acabado delicado.",
    price: "Valor según largo y diseño",
  },
  {
    icon: "🌸",
    title: "Nivelación base rubber",
    description:
      "Nivelación sobre uña natural con base rubber para reforzar, emparejar y dar un acabado más resistente.",
    price: "Valor según diseño",
  },
  {
    icon: "🤍",
    title: "Nivelación polygel",
    description:
      "Refuerzo y nivelación con polygel para aportar estructura, resistencia y una terminación más firme.",
    price: "Valor según diseño",
  },
  {
    icon: "💎",
    title: "Baño acrílico",
    description:
      "Capa de acrílico sobre la uña natural para entregar mayor resistencia y duración.",
    price: "Valor según largo y diseño",
  },
]

const skills = [
  "Esmaltado permanente",
  "Soft gel",
  "Nivelación base rubber",
  "Nivelación polygel",
  "Baño acrílico",
  "Diseños personalizados",
  "Preparación de uña natural",
  "Trabajo prolijo y detallista",
]

const galleryFilters = [
  "Acrílicas",
  "Esmaltado permanente",
  "Nivelación",
  "Full set",
  "Uñas cortas",
]

const createGalleryItems = (category, start, end, title, detail) => {
  return Array.from({ length: end - start + 1 }, (_, index) => {
    const number = start + index

    return {
      category,
      title: `${title} ${index + 1}`,
      detail,
      image: `/galeria/1%20(${number}).jpeg`,
    }
  })
}

const gallery = [
  ...createGalleryItems(
    "Acrílicas",
    1,
    8,
    "Uñas acrílicas",
    "Largos, formas y diseños personalizados"
  ),
  ...createGalleryItems(
    "Esmaltado permanente",
    9,
    16,
    "Esmaltado permanente",
    "Color, brillo y terminación prolija"
  ),
  ...createGalleryItems(
    "Nivelación",
    17,
    24,
    "Nivelación",
    "Refuerzo, estructura y acabado natural"
  ),
  ...createGalleryItems(
    "Full set",
    25,
    33,
    "Full set",
    "Diseño completo según inspiración"
  ),
  ...createGalleryItems(
    "Uñas cortas",
    34,
    41,
    "Uñas cortas",
    "Diseños limpios, cómodos y femeninos"
  ),
]

const steps = [
  {
    number: "1",
    title: "Elige tu servicio",
    text: "Selecciona el servicio que necesitas: esmaltado, soft gel, nivelación o baño acrílico.",
  },
  {
    number: "2",
    title: "Agenda una hora",
    text: "Escoge la fecha y el horario disponible desde la agenda online.",
  },
  {
    number: "3",
    title: "Confirma por WhatsApp",
    text: "Se enviará un mensaje con el detalle de tu reserva.",
  },
  {
    number: "4",
    title: "Abona tu reserva",
    text: "Para guardar la hora se solicita un abono de $5.000.",
  },
]

export default function Home() {
  const [appointments, setAppointments] = useState([])
  const [selectedService, setSelectedService] = useState(services[0].title)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [loadingAppointments, setLoadingAppointments] = useState(true)
  const [selectedGalleryFilter, setSelectedGalleryFilter] = useState(
    galleryFilters[0]
  )

  useEffect(() => {
    const loadAppointments = async () => {
      setLoadingAppointments(true)

      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("status", "available")
        .order("date", { ascending: true })
        .order("time", { ascending: true })

      setLoadingAppointments(false)

      if (error) {
        console.log("Error cargando horarios:", error)
        return
      }

      setAppointments(data || [])

      if (data && data.length > 0) {
        setSelectedDate(data[0].date)
      }
    }

    loadAppointments()
  }, [])

  const formatDate = (dateValue) => {
    if (!dateValue) return ""

    const date = new Date(`${dateValue}T00:00:00`)

    if (Number.isNaN(date.getTime())) return dateValue

    return date.toLocaleDateString("es-CL", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
  }

  const availableDays = [...new Set(appointments.map((item) => item.date))]

  const availableTimes = appointments.filter(
    (item) => item.date === selectedDate
  )

  const filteredGallery = gallery.filter(
    (item) => item.category === selectedGalleryFilter
  )

  const handleBooking = async () => {
    if (!selectedTime) {
      alert("Selecciona una hora antes de reservar.")
      return
    }

    const selectedAppointment = appointments.find(
      (appointment) =>
        appointment.date === selectedDate && appointment.time === selectedTime
    )

    if (!selectedAppointment) {
      alert("Este horario ya no está disponible.")
      return
    }

    const { error } = await supabase
      .from("appointments")
      .update({
        status: "booked",
        available: false,
      })
      .eq("id", selectedAppointment.id)

    if (error) {
      alert("No se pudo reservar el horario. Intenta nuevamente.")
      console.log(error)
      return
    }

    const message = `Hola Javiera, quiero reservar una hora para ${selectedService} el día ${formatDate(
      selectedDate
    )} a las ${selectedTime}. Entiendo que la atención es en Honestudio, Santiago, Conchalí, que no se realizan domicilios y que debo abonar ${business.deposit} para guardar la fecha.`

    const encodedMessage = encodeURIComponent(message)

    window.open(`${business.whatsappUrl}?text=${encodedMessage}`, "_blank")

    setAppointments((currentAppointments) =>
      currentAppointments.filter(
        (appointment) => appointment.id !== selectedAppointment.id
      )
    )

    setSelectedTime("")
  }

  return (
    <main className="page-glow-bg min-h-screen overflow-x-hidden text-[#24171D]">
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-[#FFD6E7]/70 bg-[#FFFDFE]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <a href="#inicio" className="flex items-center gap-4">
            <img
              src="/galeria/logo.png"
              alt="Logo Javiera Nails"
              className="logo-glow h-16 w-16 rounded-full bg-white object-contain p-1.5 md:h-20 md:w-20"
            />

            <div>
              <h1 className="text-2xl font-black leading-none text-[#FF6FAE] md:text-3xl">
                {business.name}
              </h1>
              <p className="gold-text text-sm font-bold">
                {business.instagram}
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-7 font-bold text-[#7D6670] md:flex">
            <a href="#servicios" className="hover:text-[#FF6FAE]">
              Servicios
            </a>
            <a href="#sobre-mi" className="hover:text-[#FF6FAE]">
              Javiera
            </a>
            <a href="#galeria" className="hover:text-[#FF6FAE]">
              Galería
            </a>
            <a href="#agenda" className="hover:text-[#FF6FAE]">
              Agenda
            </a>
            <a href="#contacto" className="hover:text-[#FF6FAE]">
              Contacto
            </a>
          </div>

          <a
            href="#agenda"
            className="pink-button px-5 py-3 text-sm font-black text-white transition hover:-translate-y-1"
          >
            Reservar
          </a>
        </div>
      </nav>

      <section
        id="inicio"
        className="relative overflow-hidden px-5 pb-20 pt-40 md:pb-28 md:pt-48"
      >
        <div className="absolute left-10 top-28 h-44 w-44 rounded-full bg-[#FF6FAE]/25 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 h-60 w-60 rounded-full bg-[#FFD6E7]/70 blur-3xl"></div>
        <div className="absolute right-1/3 top-32 h-32 w-32 rounded-full bg-[#F7B8CF]/45 blur-3xl"></div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-5 inline-block rounded-full bg-[#FFFDFE] px-5 py-2 font-black text-[#FF6FAE] shadow-lg shadow-pink-100">
              Manicurista certificada en Conchalí
            </p>

            <h2 className="max-w-3xl text-5xl font-black leading-tight tracking-tight text-[#24171D] md:text-7xl">
              Uñas delicadas, elegantes y hechas con{" "}
              <span className="font-script text-6xl font-normal text-[#FF6FAE] md:text-8xl">
                detalle
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#7D6670]">
              {business.experience} en {business.location}. Agenda tu hora por
              WhatsApp y confirma tu reserva con un abono de {business.deposit}.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#agenda"
                className="pink-button px-8 py-4 text-center font-black text-white transition hover:-translate-y-1"
              >
                Agendar hora
              </a>

              <a
                href="#galeria"
                className="rounded-full bg-[#FFFDFE] px-8 py-4 text-center font-black text-[#FF6FAE] shadow-xl shadow-pink-100 transition hover:-translate-y-1"
              >
                Ver trabajos
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-[#FFFDFE] p-5 shadow-lg shadow-pink-100">
                <strong className="block text-3xl font-black text-[#FF6FAE]">
                  2020
                </strong>
                <span className="text-sm font-bold text-[#7D6670]">
                  certificada desde
                </span>
              </div>

              <div className="rounded-3xl bg-[#FFFDFE] p-5 shadow-lg shadow-pink-100">
                <strong className="block text-3xl font-black text-[#FF6FAE]">
                  100%
                </strong>
                <span className="text-sm font-bold text-[#7D6670]">
                  atención personalizada
                </span>
              </div>

              <div className="rounded-3xl bg-[#FFFDFE] p-5 shadow-lg shadow-pink-100">
                <strong className="block text-3xl font-black text-[#FF6FAE]">
                  $5.000
                </strong>
                <span className="text-sm font-bold text-[#7D6670]">
                  abono de reserva
                </span>
              </div>
            </div>
          </div>

          <div className="relative min-h-[520px]">
            <div className="absolute inset-x-4 bottom-10 top-10 rounded-[3rem] bg-gradient-to-br from-[#FFD6E7] via-[#FFFDFE] to-[#F7B8CF] p-6 shadow-2xl shadow-pink-200">
              <div className="flex h-full flex-col items-center justify-center rounded-[2.4rem] bg-[#FFFDFE]/80 p-8 text-center">
                <img
                  src="/galeria/logo.png"
                  alt="Logo Javiera Nails"
                  className="logo-glow mb-8 h-40 w-40 rounded-full bg-white object-contain p-3 md:h-52 md:w-52"
                />

                <h3 className="text-4xl font-black leading-tight">
                  Diseño, cuidado y estilo en cada{" "}
                  <span className="font-script text-6xl font-normal text-[#FF6FAE]">
                    detalle
                  </span>
                </h3>

                <p className="mt-4 font-bold text-[#FF6FAE]">
                  {business.location}
                </p>

                <p className="mt-2 text-sm font-bold text-[#7D6670]">
                  {business.note}
                </p>
              </div>
            </div>

            <div className="absolute left-0 top-0 rotate-[-7deg] rounded-3xl bg-[#FFFDFE] p-5 text-center shadow-xl shadow-pink-100">
              <div className="text-4xl">✨</div>
              <p className="mt-2 font-black text-[#FF6FAE]">Diseños</p>
            </div>

            <div className="absolute bottom-0 right-0 rotate-[6deg] rounded-3xl bg-[#FFFDFE] p-5 text-center shadow-xl shadow-pink-100">
              <div className="text-4xl">🌸</div>
              <p className="mt-2 font-black text-[#FF6FAE]">Estilo</p>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="font-black text-[#FF6FAE]">Servicios y valores</p>
          <h3 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
            Todo para lucir uñas hermosas
          </h3>
          <p className="mt-5 leading-8 text-[#7D6670]">
            Valores referenciales. El precio final puede variar según diseño,
            largo, técnica y estado de la uña.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-[2rem] bg-[#FFFDFE] p-7 shadow-xl shadow-pink-100 transition hover:-translate-y-3"
            >
              <div className="mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-[#FFD6E7] text-5xl">
                {service.icon}
              </div>

              <h4 className="text-2xl font-black">{service.title}</h4>

              <p className="mt-4 leading-7 text-[#7D6670]">
                {service.description}
              </p>

              <div className="mt-6 inline-block rounded-full bg-[#FFF4F8] px-5 py-3 font-black text-[#FF6FAE]">
                {service.price}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="sobre-mi" className="bg-[#FFFDFE] px-5 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="rounded-[3rem] bg-gradient-to-br from-[#FFD6E7] to-[#F7B8CF] p-5 shadow-2xl shadow-pink-100">
            <div className="rounded-[2.4rem] bg-[#FFFDFE]/80 p-10 text-center">
              <img
                src="/galeria/logo.png"
                alt="Logo Javiera Nails"
                className="logo-glow mx-auto mb-8 h-36 w-36 rounded-full bg-white object-contain p-3 md:h-44 md:w-44"
              />

              <h3 className="text-4xl font-black">{business.owner}</h3>

              <p className="mt-3 font-black text-[#FF6FAE]">
                {business.experience}
              </p>

              <p className="mt-5 leading-8 text-[#7D6670]">
                Trabajo dedicado, prolijo y personalizado para cada clienta.
              </p>
            </div>
          </div>

          <div>
            <p className="font-black text-[#FF6FAE]">Sobre Javiera</p>

            <h3 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
              Especialista en diseños femeninos, prolijos y personalizados
            </h3>

            <p className="mt-6 text-lg leading-8 text-[#7D6670]">
              Soy {business.owner}, manicurista certificada desde 2020, con
              enfoque en prolijidad, higiene, diseño y atención cercana. Mi
              objetivo es que cada clienta se sienta cómoda, escuchada y feliz
              con el resultado.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="rounded-2xl bg-[#FFF4F8] p-4 font-bold text-[#7D6670]"
                >
                  ✅ {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="galeria" className="px-5 py-24">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="font-black text-[#FF6FAE]">Galería</p>

          <h3 className="mt-3 text-4xl font-black md:text-5xl">
            Trabajos reales
          </h3>

          <p className="mt-5 leading-8 text-[#7D6670]">
            Elige una categoría y desliza hacia el lado para ver diseños e ideas
            de uñas.
          </p>
        </div>

        <div className="mx-auto mb-8 flex max-w-7xl gap-3 overflow-x-auto pb-3">
          {galleryFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedGalleryFilter(filter)}
              className={`shrink-0 rounded-full px-5 py-3 font-black transition ${
                selectedGalleryFilter === filter
                  ? "pink-button text-white"
                  : "bg-[#FFFDFE] text-[#7D6670] shadow-md shadow-pink-100 hover:bg-[#FFF4F8]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mx-auto max-w-7xl overflow-x-auto pb-6">
          <div className="flex min-w-max gap-5">
            {filteredGallery.map((item, index) => (
              <article
                key={`${item.category}-${index}`}
                className="w-72 shrink-0 rounded-[2rem] bg-[#FFFDFE] p-4 shadow-xl shadow-pink-100 transition hover:-translate-y-2 md:w-80"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-80 w-full rounded-[1.5rem] object-cover"
                />

                <div className="pt-5">
                  <h4 className="text-xl font-black">{item.title}</h4>
                  <p className="mt-1 font-bold text-[#FF6FAE]">
                    {item.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="agenda" className="bg-[#FFFDFE] px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="font-black text-[#FF6FAE]">Agenda online</p>

            <h3 className="mt-3 text-4xl font-black md:text-5xl">
              Selecciona servicio, fecha y hora
            </h3>

            <p className="mt-5 leading-8 text-[#7D6670]">
              Al confirmar se abrirá WhatsApp con el mensaje listo. Para guardar
              la fecha se debe abonar {business.deposit}.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] bg-[#FFD6E7] p-5">
              <h4 className="mb-4 text-xl font-black">1. Servicio</h4>

              <div className="grid gap-3">
                {services.map((service) => (
                  <button
                    key={service.title}
                    onClick={() => setSelectedService(service.title)}
                    className={`rounded-2xl px-5 py-4 text-left font-black transition ${
                      selectedService === service.title
                        ? "pink-button text-white"
                        : "bg-[#FFFDFE] text-[#7D6670] hover:bg-[#FFF4F8]"
                    }`}
                  >
                    {service.title}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-3xl bg-[#FFFDFE] p-5 leading-7 text-[#7D6670]">
                <p>
                  <strong className="text-[#FF6FAE]">Atención:</strong>{" "}
                  {business.location}.
                </p>
                <p>
                  <strong className="text-[#FF6FAE]">Importante:</strong>{" "}
                  {business.note}.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-[#FFD6E7] p-5">
              <h4 className="mb-4 text-xl font-black">2. Fecha disponible</h4>

              <div className="mb-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {loadingAppointments && (
                  <p className="rounded-2xl bg-[#FFFDFE] p-5 text-[#7D6670]">
                    Cargando horarios...
                  </p>
                )}

                {!loadingAppointments && availableDays.length === 0 && (
                  <p className="rounded-2xl bg-[#FFFDFE] p-5 text-[#7D6670]">
                    No hay fechas disponibles por ahora.
                  </p>
                )}

                {availableDays.map((day) => (
                  <button
                    key={day}
                    onClick={() => {
                      setSelectedDate(day)
                      setSelectedTime("")
                    }}
                    className={`rounded-2xl px-5 py-4 text-left font-black capitalize transition ${
                      selectedDate === day
                        ? "pink-button text-white"
                        : "bg-[#FFFDFE] text-[#7D6670] hover:bg-[#FFF4F8]"
                    }`}
                  >
                    {formatDate(day)}
                  </button>
                ))}
              </div>

              <h4 className="mb-4 text-xl font-black">3. Hora disponible</h4>

              <div className="grid gap-4 sm:grid-cols-3">
                {!loadingAppointments && availableTimes.length === 0 && (
                  <p className="rounded-2xl bg-[#FFFDFE] p-5 text-[#7D6670]">
                    No hay horarios disponibles para esta fecha.
                  </p>
                )}

                {availableTimes.map((appointment) => (
                  <button
                    key={appointment.id}
                    onClick={() => setSelectedTime(appointment.time)}
                    className={`rounded-2xl px-5 py-6 text-center shadow-lg shadow-pink-100 transition hover:-translate-y-2 ${
                      selectedTime === appointment.time
                        ? "pink-button text-white"
                        : "bg-[#FFFDFE] text-[#7D6670] hover:bg-[#FFF4F8]"
                    }`}
                  >
                    <span className="block text-2xl font-black">
                      {appointment.time}
                    </span>
                    <span className="mt-2 block text-sm font-bold">
                      Disponible
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-7 rounded-3xl bg-[#FFFDFE] p-6">
                <h4 className="text-xl font-black">Resumen de reserva</h4>

                <div className="mt-4 grid gap-2 text-[#7D6670]">
                  <p>
                    <strong>Servicio:</strong> {selectedService}
                  </p>
                  <p>
                    <strong>Fecha:</strong>{" "}
                    {selectedDate
                      ? formatDate(selectedDate)
                      : "Selecciona una fecha"}
                  </p>
                  <p>
                    <strong>Hora:</strong>{" "}
                    {selectedTime || "Selecciona una hora"}
                  </p>
                  <p>
                    <strong>Ubicación:</strong> {business.location}
                  </p>
                  <p>
                    <strong>Abono:</strong> {business.deposit}
                  </p>
                </div>

                <button
                  onClick={handleBooking}
                  className="pink-button mt-6 w-full px-8 py-4 font-black text-white transition hover:-translate-y-1"
                >
                  Confirmar por WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="font-black text-[#FF6FAE]">Reserva e información</p>

            <h3 className="mt-3 text-4xl font-black md:text-5xl">
              Cómo funciona la agenda
            </h3>

            <p className="mt-5 leading-8 text-[#7D6670]">
              Revisa las condiciones antes de agendar para asegurar tu hora y
              evitar cambios de último minuto.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-[2rem] bg-[#FFFDFE] p-8 shadow-xl shadow-pink-100 transition hover:-translate-y-3"
              >
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-full bg-[#FF6FAE] text-2xl font-black text-white">
                  {step.number}
                </div>

                <h4 className="text-2xl font-black">{step.title}</h4>

                <p className="mt-4 leading-7 text-[#7D6670]">{step.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] bg-[#FFD6E7] p-8 md:p-10">
            <p className="font-black text-[#FF6FAE]">Información importante</p>

            <h4 className="mt-3 text-3xl font-black">
              Condiciones de reserva, garantía y puntualidad
            </h4>

            <div className="mt-8 grid gap-4 text-[#7D6670] md:grid-cols-2">
              <p>✅ No se agendan horas sin abono.</p>
              <p>
                ✅ Para toda hora se solicita un abono de {business.deposit}.
              </p>
              <p>
                ✅ El abono no es reembolsable si se cambia la hora el mismo día.
              </p>
              <p>
                ✅ Para cambiar una hora, se debe avisar con 24 horas de
                anticipación.
              </p>
              <p>✅ Se esperan máximo 10 minutos de atraso.</p>
              <p>✅ Al minuto 11, la hora queda cancelada.</p>
              <p>
                ✅ Llegar 20 a 30 minutos antes también se considera
                impuntualidad.
              </p>
              <p>✅ Asistir sin acompañantes.</p>
              <p>✅ Asistir con tiempo y con el diseño elegido.</p>
              <p>✅ Si vienes apurada, se recomienda no agendar ese día.</p>
            </div>

            <div className="mt-8 rounded-3xl bg-[#FFFDFE] p-6 text-[#7D6670]">
              <h5 className="text-xl font-black text-[#FF6FAE]">Garantías</h5>

              <div className="mt-4 grid gap-4">
                <p>
                  <strong>Uñas acrílicas:</strong> garantía de 5 días solamente
                  por levantamiento en zona de cutícula.
                </p>

                <p>
                  <strong>
                    Esmaltado permanente, base rubber y nivelación:
                  </strong>{" "}
                  garantía de 3 días solamente por mal secado en lámpara o
                  burbujas.
                </p>

                <p>
                  No aplica garantía si el esmalte se pica por roce o mal
                  cuidado de las uñas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contacto"
        className="bg-gradient-to-br from-[#FF6FAE] to-[#E94D91] px-5 py-24 text-white"
      >
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/20 bg-white/15 p-8 text-center shadow-2xl backdrop-blur-xl md:p-14">
          <p className="font-black text-pink-100">Contacto</p>

          <h3 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
            Agenda tu hora con Javiera
          </h3>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-pink-50">
            Escríbeme por WhatsApp o Instagram para consultar disponibilidad,
            valores, diseños y condiciones de atención. Atención en Honestudio,
            Santiago, Conchalí. No se realizan domicilios.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={business.whatsappUrl}
              target="_blank"
              className="rounded-full bg-white px-8 py-4 font-black text-[#FF6FAE] transition hover:-translate-y-1"
            >
              WhatsApp
            </a>

            <a
              href={business.instagramUrl}
              target="_blank"
              className="rounded-full border-2 border-white px-8 py-4 font-black text-white transition hover:-translate-y-1"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>

      <a
        href={business.whatsappUrl}
        target="_blank"
        className="fixed bottom-5 right-5 z-50 rounded-full bg-[#25d366] px-5 py-4 font-black text-white shadow-2xl transition hover:-translate-y-1 hover:scale-105"
      >
        💬 WhatsApp
      </a>

      <footer className="bg-[#24171D] px-5 py-10 text-center text-white">
        <h3 className="text-2xl font-black text-[#FF6FAE]">
          {business.brand}
        </h3>

        <p className="mt-2 text-zinc-300">
          Manicurista certificada desde 2020 · Santiago, Conchalí
        </p>

        <p className="mt-1 text-zinc-400">
          Agenda por WhatsApp: {business.phone}
        </p>
      </footer>
    </main>
  )
}