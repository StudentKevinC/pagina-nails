"use client"

import { useState } from "react"

const business = {
  name: "Javiera Nails Studio",
  owner: "Javiera Valenzuela",
  experience: "10 años de experiencia",
  whatsappUrl: "https://wa.me/56974779986",
  instagramUrl: "https://www.instagram.com/",
  instagram: "@javieranails",
  deposit: "$5.000",
}

const services = [
  {
    icon: "💅",
    title: "Manicure permanente",
    description: "Esmaltado permanente con terminación brillante y prolija.",
  },
  {
    icon: "✨",
    title: "Soft gel",
    description: "Extensión de uñas con acabado natural, elegante y resistente.",
  },
  {
    icon: "🌸",
    title: "Diseños personalizados",
    description: "Diseños delicados, dibujos, brillos, francés, efectos y detalles.",
  },
  {
    icon: "🧴",
    title: "Retiro y cuidado",
    description: "Retiro seguro, limado, preparación y cuidado de la uña natural.",
  },
]

const skills = [
  "Manicure permanente",
  "Soft gel",
  "Diseños a mano alzada",
  "Preparación de uña natural",
  "Atención personalizada",
  "Trabajo a domicilio",
]

const gallery = [
  {
    emoji: "💗",
    title: "Diseño rosado",
    detail: "Tonos suaves y femeninos",
  },
  {
    emoji: "🤍",
    title: "French elegante",
    detail: "Clásico, limpio y delicado",
  },
  {
    emoji: "✨",
    title: "Brillos y detalles",
    detail: "Ideal para ocasiones especiales",
  },
  {
    emoji: "🌷",
    title: "Diseño floral",
    detail: "Arte delicado y personalizado",
  },
  {
    emoji: "💎",
    title: "Soft gel",
    detail: "Extensión natural y resistente",
  },
]

const availableSlots = [
  { date: "Lunes 10 de junio", times: ["10:00", "12:00", "16:00"] },
  { date: "Martes 11 de junio", times: ["09:30", "14:00", "18:00"] },
  { date: "Miércoles 12 de junio", times: ["11:00", "15:30", "17:30"] },
  { date: "Jueves 13 de junio", times: ["10:30", "13:00", "19:00"] },
]

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(availableSlots[0].date)

  const selectedDay = availableSlots.find((slot) => slot.date === selectedDate)

  const handleBooking = (date, time) => {
    const message = `Hola Javiera, quiero reservar una hora para uñas el ${date} a las ${time}. Entiendo que debo abonar ${business.deposit} para guardar la fecha.`
    const encodedMessage = encodeURIComponent(message)

    window.open(`${business.whatsappUrl}?text=${encodedMessage}`, "_blank")
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fff7fb] text-zinc-900">
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-pink-100 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#inicio" className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-pink-300 to-pink-500 text-2xl shadow-lg shadow-pink-200">
              💅
            </div>

            <div>
              <h1 className="text-xl font-black leading-none text-pink-500">
                {business.name}
              </h1>
              <p className="text-xs font-bold text-zinc-500">
                Uñas a domicilio
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-7 font-bold text-zinc-600 md:flex">
            <a href="#servicios" className="hover:text-pink-500">
              Servicios
            </a>
            <a href="#sobre-mi" className="hover:text-pink-500">
              Javiera
            </a>
            <a href="#galeria" className="hover:text-pink-500">
              Galería
            </a>
            <a href="#agenda" className="hover:text-pink-500">
              Agenda
            </a>
            <a href="#contacto" className="hover:text-pink-500">
              Contacto
            </a>
          </div>

          <a
            href="#agenda"
            className="rounded-full bg-pink-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-pink-200 transition hover:-translate-y-1 hover:bg-pink-600"
          >
            Reservar
          </a>
        </div>
      </nav>

      <section
        id="inicio"
        className="relative overflow-hidden px-5 pb-20 pt-36 md:pb-28 md:pt-44"
      >
        <div className="absolute left-10 top-28 h-40 w-40 rounded-full bg-pink-200 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 h-52 w-52 rounded-full bg-rose-200 blur-3xl"></div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-5 inline-block rounded-full bg-white px-5 py-2 font-black text-pink-500 shadow-lg shadow-pink-100">
              Salón de uñas a domicilio
            </p>

            <h2 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Uñas lindas, delicadas y hechas con amor
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
              Atención personalizada en domicilio, con diseños femeninos,
              prolijos y adaptados a tu estilo. Agenda tu hora online y confirma
              tu reserva por WhatsApp.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#agenda"
                className="rounded-full bg-pink-500 px-8 py-4 text-center font-black text-white shadow-xl shadow-pink-200 transition hover:-translate-y-1 hover:bg-pink-600"
              >
                Agendar hora
              </a>

              <a
                href="#galeria"
                className="rounded-full bg-white px-8 py-4 text-center font-black text-pink-500 shadow-xl shadow-pink-100 transition hover:-translate-y-1"
              >
                Ver trabajos
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white p-5 shadow-lg shadow-pink-100">
                <strong className="block text-3xl font-black text-pink-500">
                  10+
                </strong>
                <span className="text-sm font-bold text-zinc-600">
                  años de experiencia
                </span>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-lg shadow-pink-100">
                <strong className="block text-3xl font-black text-pink-500">
                  100%
                </strong>
                <span className="text-sm font-bold text-zinc-600">
                  atención personalizada
                </span>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-lg shadow-pink-100">
                <strong className="block text-3xl font-black text-pink-500">
                  $5.000
                </strong>
                <span className="text-sm font-bold text-zinc-600">
                  abono de reserva
                </span>
              </div>
            </div>
          </div>

          <div className="relative min-h-[460px]">
            <div className="absolute inset-x-4 bottom-10 top-10 rounded-[3rem] bg-gradient-to-br from-pink-200 via-white to-rose-200 p-6 shadow-2xl shadow-pink-200">
              <div className="flex h-full flex-col items-center justify-center rounded-[2.4rem] bg-white/80 p-8 text-center">
                <div className="mb-6 text-8xl">💅</div>
                <h3 className="text-4xl font-black leading-tight">
                  Manicure con estilo delicado
                </h3>
                <p className="mt-4 font-bold text-pink-500">
                  Por {business.owner}
                </p>
              </div>
            </div>

            <div className="absolute left-0 top-0 rotate-[-7deg] rounded-3xl bg-white p-5 text-center shadow-xl shadow-pink-100">
              <div className="text-4xl">✨</div>
              <p className="mt-2 font-black text-pink-500">Diseños</p>
            </div>

            <div className="absolute bottom-0 right-0 rotate-[6deg] rounded-3xl bg-white p-5 text-center shadow-xl shadow-pink-100">
              <div className="text-4xl">🌸</div>
              <p className="mt-2 font-black text-pink-500">Domicilio</p>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="font-black text-pink-500">Servicios</p>
          <h3 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
            Todo para lucir uñas hermosas
          </h3>
          <p className="mt-5 leading-8 text-zinc-600">
            Servicios pensados para una atención cómoda, prolija y personalizada
            desde tu domicilio.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-[2rem] bg-white p-8 shadow-xl shadow-pink-100 transition hover:-translate-y-3"
            >
              <div className="mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-pink-100 text-5xl">
                {service.icon}
              </div>
              <h4 className="text-2xl font-black">{service.title}</h4>
              <p className="mt-4 leading-7 text-zinc-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="sobre-mi" className="bg-white px-5 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="rounded-[3rem] bg-gradient-to-br from-pink-200 to-rose-200 p-5 shadow-2xl shadow-pink-100">
            <div className="rounded-[2.4rem] bg-white/80 p-10 text-center">
              <div className="mb-6 text-8xl">👩‍🎨</div>
              <h3 className="text-4xl font-black">{business.owner}</h3>
              <p className="mt-3 font-black text-pink-500">
                Especialista en uñas
              </p>
              <p className="mt-5 leading-8 text-zinc-600">
                Trabajo dedicado, detallista y personalizado para cada clienta.
              </p>
            </div>
          </div>

          <div>
            <p className="font-black text-pink-500">Sobre mí</p>
            <h3 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
              {business.experience} creando diseños femeninos y prolijos
            </h3>

            <p className="mt-6 text-lg leading-8 text-zinc-600">
              Soy {business.owner}, realizo servicios de uñas a domicilio con
              enfoque en prolijidad, higiene, diseño y una atención cercana. Mi
              objetivo es que cada clienta se sienta cómoda y quede feliz con el
              resultado.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="rounded-2xl bg-pink-50 p-4 font-bold text-zinc-700"
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
          <p className="font-black text-pink-500">Galería</p>
          <h3 className="mt-3 text-4xl font-black md:text-5xl">
            Trabajos e inspiración
          </h3>
          <p className="mt-5 leading-8 text-zinc-600">
            Desliza hacia el lado para ver ideas de diseños, colores y estilos.
          </p>
        </div>

        <div className="mx-auto max-w-7xl overflow-x-auto pb-6">
          <div className="flex min-w-max gap-5">
            {gallery.map((item) => (
              <article
                key={item.title}
                className="w-72 shrink-0 rounded-[2rem] bg-gradient-to-br from-pink-200 via-white to-rose-200 p-5 shadow-xl shadow-pink-100 md:w-80"
              >
                <div className="grid h-64 place-items-center rounded-[1.5rem] bg-white/80 text-center">
                  <div>
                    <div className="text-7xl">{item.emoji}</div>
                    <h4 className="mt-5 text-2xl font-black">{item.title}</h4>
                    <p className="mt-2 font-bold text-pink-500">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="agenda" className="bg-white px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="font-black text-pink-500">Agenda online</p>
            <h3 className="mt-3 text-4xl font-black md:text-5xl">
              Selecciona una hora disponible
            </h3>
            <p className="mt-5 leading-8 text-zinc-600">
              Al seleccionar una hora se abrirá WhatsApp con el mensaje listo.
              Para guardar la fecha se debe abonar {business.deposit}.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] bg-pink-50 p-5">
              <h4 className="mb-4 text-xl font-black">Días disponibles</h4>

              <div className="grid gap-3">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.date}
                    onClick={() => setSelectedDate(slot.date)}
                    className={`rounded-2xl px-5 py-4 text-left font-black transition ${
                      selectedDate === slot.date
                        ? "bg-pink-500 text-white shadow-lg shadow-pink-200"
                        : "bg-white text-zinc-700 hover:bg-pink-100"
                    }`}
                  >
                    {slot.date}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-pink-50 p-5">
              <h4 className="mb-4 text-xl font-black">
                Horas para {selectedDate}
              </h4>

              <div className="grid gap-4 sm:grid-cols-3">
                {selectedDay.times.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleBooking(selectedDate, time)}
                    className="rounded-2xl bg-white px-5 py-6 text-center shadow-lg shadow-pink-100 transition hover:-translate-y-2 hover:bg-pink-500 hover:text-white"
                  >
                    <span className="block text-2xl font-black">{time}</span>
                    <span className="mt-2 block text-sm font-bold">
                      Reservar por WhatsApp
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-white p-5 leading-7 text-zinc-600">
                <strong className="text-pink-500">Importante:</strong> La hora
                queda reservada una vez realizado el abono de {business.deposit}.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="bg-gradient-to-br from-pink-400 to-rose-500 px-5 py-24 text-white">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/20 bg-white/15 p-8 text-center shadow-2xl backdrop-blur-xl md:p-14">
          <p className="font-black text-pink-100">Contacto</p>

          <h3 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
            Agenda tu hora con Javiera
          </h3>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-pink-50">
            Escríbeme por WhatsApp o Instagram para consultar diseños, valores,
            disponibilidad y condiciones del servicio a domicilio.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={business.whatsappUrl}
              target="_blank"
              className="rounded-full bg-white px-8 py-4 font-black text-pink-500 transition hover:-translate-y-1"
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

      <footer className="bg-zinc-950 px-5 py-10 text-center text-white">
        <h3 className="text-2xl font-black text-pink-400">{business.name}</h3>
        <p className="mt-2 text-zinc-400">
          Uñas a domicilio por {business.owner}
        </p>
      </footer>
    </main>
  )
}