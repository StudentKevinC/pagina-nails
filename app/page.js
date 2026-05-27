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

const gallery = [
  {
    category: "Acrílicas",
    emoji: "💎",
    title: "Acrílicas delicadas",
    detail: "Largos, formas y diseños personalizados",
    image: "",
  },
  {
    category: "Acrílicas",
    emoji: "🌸",
    title: "Acrílicas con diseño",
    detail: "Diseños femeninos y detalles a elección",
    image: "",
  },
  {
    category: "Esmaltado permanente",
    emoji: "💅",
    title: "Esmaltado permanente",
    detail: "Color, brillo y terminación prolija",
    image: "",
  },
  {
    category: "Esmaltado permanente",
    emoji: "✨",
    title: "Permanente con detalles",
    detail: "Diseños simples y elegantes",
    image: "",
  },
  {
    category: "Nivelación",
    emoji: "🤍",
    title: "Nivelación base rubber",
    detail: "Refuerzo y acabado natural",
    image: "",
  },
  {
    category: "Nivelación",
    emoji: "🌷",
    title: "Nivelación con diseño",
    detail: "Estructura, brillo y detalle",
    image: "",
  },
  {
    category: "Full set",
    emoji: "🦋",
    title: "Full set personalizado",
    detail: "Diseño completo según inspiración",
    image: "",
  },
  {
    category: "Full set",
    emoji: "💗",
    title: "Full set glam",
    detail: "Brillos, detalles y estilo completo",
    image: "",
  },
  {
    category: "Uñas cortas",
    emoji: "🌼",
    title: "Uñas cortas delicadas",
    detail: "Diseños limpios y femeninos",
    image: "",
  },
  {
    category: "Uñas cortas",
    emoji: "🤍",
    title: "Uñas cortas naturales",
    detail: "Estilo simple, elegante y cómodo",
    image: "",
  },
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
    text: "Escoge el día y horario disponible desde la agenda online.",
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
        .eq("available", true)
        .order("id", { ascending: true })

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

  const availableDays = [...new Set(appointments.map((item) => item.date))]

  const availableTimes = appointments
    .filter((item) => item.date === selectedDate)
    .map((item) => item.time)

  const filteredGallery = gallery.filter(
    (item) => item.category === selectedGalleryFilter
  )

  const handleBooking = () => {
    if (!selectedTime) {
      alert("Selecciona una hora antes de reservar.")
      return
    }

    const message = `Hola Javiera, quiero reservar una hora para ${selectedService} el día ${selectedDate} a las ${selectedTime}. Entiendo que la atención es en Honestudio, Santiago, Conchalí, que no se realizan domicilios y que debo abonar ${business.deposit} para guardar la fecha.`
    const encodedMessage = encodeURIComponent(message)

    window.open(`${business.whatsappUrl}?text=${encodedMessage}`, "_blank")
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fff8fb] text-[#2b2024]">
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-[#f2d7e2] bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#inicio" className="flex items-center gap-3">
            <img
              src="/logo.jpeg"
              alt="Logo Javiera Nails"
              className="h-12 w-12 rounded-full bg-white object-contain p-1 shadow-lg shadow-pink-200"
            />

            <div>
              <h1 className="text-xl font-black leading-none text-[#d96f9b]">
                {business.name}
              </h1>
              <p className="text-xs font-bold text-[#7a646d]">
                {business.instagram}
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-7 font-bold text-[#7a646d] md:flex">
            <a href="#servicios" className="hover:text-[#d96f9b]">
              Servicios
            </a>
            <a href="#sobre-mi" className="hover:text-[#d96f9b]">
              Javiera
            </a>
            <a href="#galeria" className="hover:text-[#d96f9b]">
              Galería
            </a>
            <a href="#agenda" className="hover:text-[#d96f9b]">
              Agenda
            </a>
            <a href="#contacto" className="hover:text-[#d96f9b]">
              Contacto
            </a>
          </div>

          <a
            href="#agenda"
            className="rounded-full bg-[#d96f9b] px-5 py-3 text-sm font-black text-white shadow-lg shadow-pink-200 transition hover:-translate-y-1 hover:bg-[#c85f8b]"
          >
            Reservar
          </a>
        </div>
      </nav>

      <section
        id="inicio"
        className="relative overflow-hidden px-5 pb-20 pt-36 md:pb-28 md:pt-44"
      >
        <div className="absolute left-10 top-28 h-40 w-40 rounded-full bg-[#f7c8d9] blur-3xl"></div>
        <div className="absolute bottom-10 right-10 h-52 w-52 rounded-full bg-[#f1d5bd] blur-3xl"></div>
        <div className="absolute right-1/3 top-32 h-28 w-28 rounded-full bg-[#f8e4ec] blur-3xl"></div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-5 inline-block rounded-full bg-white px-5 py-2 font-black text-[#d96f9b] shadow-lg shadow-pink-100">
              Manicurista certificada en Conchalí
            </p>

            <h2 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Uñas delicadas, elegantes y hechas con detalle
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6d5c63]">
              {business.experience} en {business.location}. Agenda tu hora por
              WhatsApp y confirma tu reserva con un abono de {business.deposit}.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#agenda"
                className="rounded-full bg-[#d96f9b] px-8 py-4 text-center font-black text-white shadow-xl shadow-pink-200 transition hover:-translate-y-1 hover:bg-[#c85f8b]"
              >
                Agendar hora
              </a>

              <a
                href="#galeria"
                className="rounded-full bg-white px-8 py-4 text-center font-black text-[#d96f9b] shadow-xl shadow-pink-100 transition hover:-translate-y-1"
              >
                Ver trabajos
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white p-5 shadow-lg shadow-pink-100">
                <strong className="block text-3xl font-black text-[#d96f9b]">
                  2020
                </strong>
                <span className="text-sm font-bold text-[#7a646d]">
                  certificada desde
                </span>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-lg shadow-pink-100">
                <strong className="block text-3xl font-black text-[#d96f9b]">
                  100%
                </strong>
                <span className="text-sm font-bold text-[#7a646d]">
                  atención personalizada
                </span>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-lg shadow-pink-100">
                <strong className="block text-3xl font-black text-[#d96f9b]">
                  $5.000
                </strong>
                <span className="text-sm font-bold text-[#7a646d]">
                  abono de reserva
                </span>
              </div>
            </div>
          </div>

          <div className="relative min-h-[460px]">
            <div className="absolute inset-x-4 bottom-10 top-10 rounded-[3rem] bg-gradient-to-br from-[#f8dce8] via-white to-[#f1d5bd] p-6 shadow-2xl shadow-pink-200">
              <div className="flex h-full flex-col items-center justify-center rounded-[2.4rem] bg-white/80 p-8 text-center">
                <img
                  src="/logo.jpeg"
                  alt="Logo Javiera Nails"
                  className="mb-6 h-28 w-28 rounded-full bg-white object-contain p-2 shadow-lg shadow-pink-200"
                />

                <h3 className="text-4xl font-black leading-tight">
                  Diseño, cuidado y estilo en cada detalle
                </h3>
                <p className="mt-4 font-bold text-[#d96f9b]">
                  {business.location}
                </p>
                <p className="mt-2 text-sm font-bold text-[#7a646d]">
                  {business.note}
                </p>
              </div>
            </div>

            <div className="absolute left-0 top-0 rotate-[-7deg] rounded-3xl bg-white p-5 text-center shadow-xl shadow-pink-100">
              <div className="text-4xl">✨</div>
              <p className="mt-2 font-black text-[#d96f9b]">Diseños</p>
            </div>

            <div className="absolute bottom-0 right-0 rotate-[6deg] rounded-3xl bg-white p-5 text-center shadow-xl shadow-pink-100">
              <div className="text-4xl">🌸</div>
              <p className="mt-2 font-black text-[#d96f9b]">Estilo</p>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="font-black text-[#d96f9b]">Servicios y valores</p>
          <h3 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
            Todo para lucir uñas hermosas
          </h3>
          <p className="mt-5 leading-8 text-[#6d5c63]">
            Valores referenciales. El precio final puede variar según diseño,
            largo, técnica y estado de la uña.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-[2rem] bg-white p-7 shadow-xl shadow-pink-100 transition hover:-translate-y-3"
            >
              <div className="mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-[#f8dce8] text-5xl">
                {service.icon}
              </div>

              <h4 className="text-2xl font-black">{service.title}</h4>

              <p className="mt-4 leading-7 text-[#6d5c63]">
                {service.description}
              </p>

              <div className="mt-6 inline-block rounded-full bg-[#fff1f6] px-5 py-3 font-black text-[#d96f9b]">
                {service.price}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="sobre-mi" className="bg-white px-5 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="rounded-[3rem] bg-gradient-to-br from-[#f8dce8] to-[#f1d5bd] p-5 shadow-2xl shadow-pink-100">
            <div className="rounded-[2.4rem] bg-white/80 p-10 text-center">
              <img
                src="/logo.jpeg"
                alt="Logo Javiera Nails"
                className="mx-auto mb-6 h-24 w-24 rounded-full bg-white object-contain p-2 shadow-lg shadow-pink-200"
              />

              <h3 className="text-4xl font-black">{business.owner}</h3>

              <p className="mt-3 font-black text-[#d96f9b]">
                {business.experience}
              </p>

              <p className="mt-5 leading-8 text-[#6d5c63]">
                Trabajo dedicado, prolijo y personalizado para cada clienta.
              </p>
            </div>
          </div>

          <div>
            <p className="font-black text-[#d96f9b]">Sobre Javiera</p>

            <h3 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
              Especialista en diseños femeninos, prolijos y personalizados
            </h3>

            <p className="mt-6 text-lg leading-8 text-[#6d5c63]">
              Soy {business.owner}, manicurista certificada desde 2020, con
              enfoque en prolijidad, higiene, diseño y atención cercana. Mi
              objetivo es que cada clienta se sienta cómoda, escuchada y feliz
              con el resultado.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="rounded-2xl bg-[#fff1f6] p-4 font-bold text-[#5f4d55]"
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
          <p className="font-black text-[#d96f9b]">Galería</p>

          <h3 className="mt-3 text-4xl font-black md:text-5xl">
            Trabajos e inspiración
          </h3>

          <p className="mt-5 leading-8 text-[#6d5c63]">
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
                  ? "bg-[#d96f9b] text-white shadow-lg shadow-pink-200"
                  : "bg-white text-[#6d5c63] shadow-md shadow-pink-100 hover:bg-[#fff1f6]"
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
                className="w-72 shrink-0 rounded-[2rem] bg-gradient-to-br from-[#f8dce8] via-white to-[#f1d5bd] p-5 shadow-xl shadow-pink-100 transition hover:-translate-y-2 md:w-80"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-72 w-full rounded-[1.5rem] object-cover"
                  />
                ) : (
                  <div className="grid h-72 place-items-center rounded-[1.5rem] bg-white/80 text-center">
                    <div>
                      <div className="text-7xl">{item.emoji}</div>
                      <h4 className="mt-5 text-2xl font-black">
                        {item.title}
                      </h4>
                      <p className="mt-2 font-bold text-[#d96f9b]">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                )}

                {item.image && (
                  <div className="pt-5">
                    <h4 className="text-xl font-black">{item.title}</h4>
                    <p className="mt-1 font-bold text-[#d96f9b]">
                      {item.detail}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="agenda" className="bg-white px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="font-black text-[#d96f9b]">Agenda online</p>

            <h3 className="mt-3 text-4xl font-black md:text-5xl">
              Selecciona servicio, día y hora
            </h3>

            <p className="mt-5 leading-8 text-[#6d5c63]">
              Al confirmar se abrirá WhatsApp con el mensaje listo. Para guardar
              la fecha se debe abonar {business.deposit}.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] bg-[#fff1f6] p-5">
              <h4 className="mb-4 text-xl font-black">1. Servicio</h4>

              <div className="grid gap-3">
                {services.map((service) => (
                  <button
                    key={service.title}
                    onClick={() => setSelectedService(service.title)}
                    className={`rounded-2xl px-5 py-4 text-left font-black transition ${
                      selectedService === service.title
                        ? "bg-[#d96f9b] text-white shadow-lg shadow-pink-200"
                        : "bg-white text-[#5f4d55] hover:bg-[#f8dce8]"
                    }`}
                  >
                    {service.title}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-3xl bg-white p-5 leading-7 text-[#6d5c63]">
                <p>
                  <strong className="text-[#d96f9b]">Atención:</strong>{" "}
                  {business.location}.
                </p>
                <p>
                  <strong className="text-[#d96f9b]">Importante:</strong>{" "}
                  {business.note}.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-[#fff1f6] p-5">
              <h4 className="mb-4 text-xl font-black">2. Día disponible</h4>

              <div className="mb-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {loadingAppointments && (
                  <p className="rounded-2xl bg-white p-5 text-[#6d5c63]">
                    Cargando horarios...
                  </p>
                )}

                {!loadingAppointments && availableDays.length === 0 && (
                  <p className="rounded-2xl bg-white p-5 text-[#6d5c63]">
                    No hay días disponibles por ahora.
                  </p>
                )}

                {availableDays.map((day) => (
                  <button
                    key={day}
                    onClick={() => {
                      setSelectedDate(day)
                      setSelectedTime("")
                    }}
                    className={`rounded-2xl px-5 py-4 text-left font-black transition ${
                      selectedDate === day
                        ? "bg-[#d96f9b] text-white shadow-lg shadow-pink-200"
                        : "bg-white text-[#5f4d55] hover:bg-[#f8dce8]"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              <h4 className="mb-4 text-xl font-black">3. Hora disponible</h4>

              <div className="grid gap-4 sm:grid-cols-3">
                {!loadingAppointments && availableTimes.length === 0 && (
                  <p className="rounded-2xl bg-white p-5 text-[#6d5c63]">
                    No hay horarios disponibles para este día.
                  </p>
                )}

                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`rounded-2xl px-5 py-6 text-center shadow-lg shadow-pink-100 transition hover:-translate-y-2 ${
                      selectedTime === time
                        ? "bg-[#d96f9b] text-white"
                        : "bg-white text-[#5f4d55] hover:bg-[#f8dce8]"
                    }`}
                  >
                    <span className="block text-2xl font-black">{time}</span>
                    <span className="mt-2 block text-sm font-bold">
                      Disponible
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-7 rounded-3xl bg-white p-6">
                <h4 className="text-xl font-black">Resumen de reserva</h4>

                <div className="mt-4 grid gap-2 text-[#6d5c63]">
                  <p>
                    <strong>Servicio:</strong> {selectedService}
                  </p>
                  <p>
                    <strong>Día:</strong>{" "}
                    {selectedDate || "Selecciona un día"}
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
                  className="mt-6 w-full rounded-full bg-[#d96f9b] px-8 py-4 font-black text-white shadow-lg shadow-pink-200 transition hover:-translate-y-1 hover:bg-[#c85f8b]"
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
            <p className="font-black text-[#d96f9b]">Reserva e información</p>

            <h3 className="mt-3 text-4xl font-black md:text-5xl">
              Cómo funciona la agenda
            </h3>

            <p className="mt-5 leading-8 text-[#6d5c63]">
              Revisa las condiciones antes de agendar para asegurar tu hora y
              evitar cambios de último minuto.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-[2rem] bg-white p-8 shadow-xl shadow-pink-100 transition hover:-translate-y-3"
              >
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-full bg-[#d96f9b] text-2xl font-black text-white">
                  {step.number}
                </div>

                <h4 className="text-2xl font-black">{step.title}</h4>

                <p className="mt-4 leading-7 text-[#6d5c63]">{step.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] bg-[#fff1f6] p-8 md:p-10">
            <p className="font-black text-[#d96f9b]">Información importante</p>

            <h4 className="mt-3 text-3xl font-black">
              Condiciones de reserva, garantía y puntualidad
            </h4>

            <div className="mt-8 grid gap-4 text-[#6d5c63] md:grid-cols-2">
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

            <div className="mt-8 rounded-3xl bg-white p-6 text-[#6d5c63]">
              <h5 className="text-xl font-black text-[#d96f9b]">Garantías</h5>

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
        className="bg-gradient-to-br from-[#d96f9b] to-[#b85b7f] px-5 py-24 text-white"
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
              className="rounded-full bg-white px-8 py-4 font-black text-[#d96f9b] transition hover:-translate-y-1"
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

      <footer className="bg-[#1f171b] px-5 py-10 text-center text-white">
        <h3 className="text-2xl font-black text-[#f3a9c6]">
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