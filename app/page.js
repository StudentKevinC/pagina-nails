"use client"

import { useState } from "react"

const business = {
  name: "JV Nails Studio",
  owner: "Javiera Valenzuela",
  experience: "10 años de experiencia",
  whatsappUrl: "https://wa.me/56974779986",
  instagramUrl: "https://www.instagram.com/",
  instagram: "@jvnailsstudio",
  deposit: "$5.000",
  location: "Atención en domicilio de la especialista",
}

const services = [
  {
    icon: "💅",
    title: "Manicure permanente",
    description: "Esmaltado permanente con preparación, limpieza y terminación prolija.",
    price: "Desde $15.000",
  },
  {
    icon: "✨",
    title: "Soft gel",
    description: "Extensión de uñas con acabado elegante, natural y resistente.",
    price: "Desde $22.000",
  },
  {
    icon: "🌸",
    title: "Diseños personalizados",
    description: "Diseños delicados, brillos, francés, efectos, stickers y detalles.",
    price: "Desde $2.000 adicional",
  },
  {
    icon: "🧴",
    title: "Retiro y cuidado",
    description: "Retiro seguro, limado, limpieza y cuidado de la uña natural.",
    price: "Desde $5.000",
  },
]

const skills = [
  "Manicure permanente",
  "Soft gel",
  "Diseños delicados",
  "Preparación de uña natural",
  "Atención personalizada",
  "Trabajo prolijo y detallista",
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

const testimonials = [
  {
    name: "Camila R.",
    text: "Muy prolija y detallista. Me encantó el resultado y las uñas me duraron perfecto.",
  },
  {
    name: "Fernanda M.",
    text: "Excelente atención, súper cuidadosa y ordenada. El diseño quedó precioso.",
  },
  {
    name: "Valentina S.",
    text: "Me gustó mucho la experiencia. Javiera se toma el tiempo para dejar todo impecable.",
  },
]

const steps = [
  {
    number: "1",
    title: "Elige tu servicio",
    text: "Selecciona manicure, soft gel, retiro, diseño o el servicio que necesites.",
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
  const [selectedService, setSelectedService] = useState(services[0].title)
  const [selectedDate, setSelectedDate] = useState(availableSlots[0].date)
  const [selectedTime, setSelectedTime] = useState("")

  const selectedDay = availableSlots.find((slot) => slot.date === selectedDate)

  const handleBooking = () => {
    if (!selectedTime) {
      alert("Selecciona una hora antes de reservar.")
      return
    }

    const message = `Hola Javiera, quiero reservar una hora para ${selectedService} el ${selectedDate} a las ${selectedTime}. Entiendo que debo abonar ${business.deposit} para guardar la fecha.`
    const encodedMessage = encodeURIComponent(message)

    window.open(`${business.whatsappUrl}?text=${encodedMessage}`, "_blank")
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fff8fb] text-[#2b2024]">
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-[#f2d7e2] bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#inicio" className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#f7c8d9] to-[#e78aae] text-lg font-black text-white shadow-lg shadow-pink-200">
              JV
            </div>

            <div>
              <h1 className="text-xl font-black leading-none text-[#d96f9b]">
                {business.name}
              </h1>
              <p className="text-xs font-bold text-[#7a646d]">
                Uñas por {business.owner}
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
              Salón de uñas personalizado
            </p>

            <h2 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Uñas delicadas, elegantes y hechas con detalle
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6d5c63]">
              Atención personalizada por Javiera Valenzuela, especialista en
              manicure, soft gel y diseños delicados. Agenda tu hora online y
              confirma tu reserva por WhatsApp.
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
                  10+
                </strong>
                <span className="text-sm font-bold text-[#7a646d]">
                  años de experiencia
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
                <div className="mb-6 text-8xl">💅</div>
                <h3 className="text-4xl font-black leading-tight">
                  Diseño, cuidado y estilo en cada detalle
                </h3>
                <p className="mt-4 font-bold text-[#d96f9b]">
                  Por {business.owner}
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

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-[2rem] bg-white p-8 shadow-xl shadow-pink-100 transition hover:-translate-y-3"
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
              <div className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-full bg-[#d96f9b] text-3xl font-black text-white">
                JV
              </div>

              <h3 className="text-4xl font-black">{business.owner}</h3>

              <p className="mt-3 font-black text-[#d96f9b]">
                Especialista en uñas
              </p>

              <p className="mt-5 leading-8 text-[#6d5c63]">
                Trabajo dedicado, prolijo y personalizado para cada clienta.
              </p>
            </div>
          </div>

          <div>
            <p className="font-black text-[#d96f9b]">Sobre Javiera</p>

            <h3 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
              {business.experience} creando diseños femeninos y prolijos
            </h3>

            <p className="mt-6 text-lg leading-8 text-[#6d5c63]">
              Soy {business.owner}, especialista en servicios de uñas con
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
            Desliza hacia el lado para ver ideas de diseños, colores y estilos.
            Luego esta sección se puede reemplazar por fotos reales.
          </p>
        </div>

        <div className="mx-auto max-w-7xl overflow-x-auto pb-6">
          <div className="flex min-w-max gap-5">
            {gallery.map((item) => (
              <article
                key={item.title}
                className="w-72 shrink-0 rounded-[2rem] bg-gradient-to-br from-[#f8dce8] via-white to-[#f1d5bd] p-5 shadow-xl shadow-pink-100 transition hover:-translate-y-2 md:w-80"
              >
                <div className="grid h-64 place-items-center rounded-[1.5rem] bg-white/80 text-center">
                  <div>
                    <div className="text-7xl">{item.emoji}</div>
                    <h4 className="mt-5 text-2xl font-black">{item.title}</h4>
                    <p className="mt-2 font-bold text-[#d96f9b]">
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
            </div>

            <div className="rounded-[2rem] bg-[#fff1f6] p-5">
              <h4 className="mb-4 text-xl font-black">2. Día disponible</h4>

              <div className="mb-7 grid gap-3 sm:grid-cols-2">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.date}
                    onClick={() => {
                      setSelectedDate(slot.date)
                      setSelectedTime("")
                    }}
                    className={`rounded-2xl px-5 py-4 text-left font-black transition ${
                      selectedDate === slot.date
                        ? "bg-[#d96f9b] text-white shadow-lg shadow-pink-200"
                        : "bg-white text-[#5f4d55] hover:bg-[#f8dce8]"
                    }`}
                  >
                    {slot.date}
                  </button>
                ))}
              </div>

              <h4 className="mb-4 text-xl font-black">3. Hora disponible</h4>

              <div className="grid gap-4 sm:grid-cols-3">
                {selectedDay.times.map((time) => (
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
                    <strong>Fecha:</strong> {selectedDate}
                  </p>
                  <p>
                    <strong>Hora:</strong>{" "}
                    {selectedTime || "Selecciona una hora"}
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
            <p className="font-black text-[#d96f9b]">Cómo funciona</p>

            <h3 className="mt-3 text-4xl font-black md:text-5xl">
              Reserva tu hora en simples pasos
            </h3>
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
        </div>
      </section>

      <section className="bg-white px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="font-black text-[#d96f9b]">Opiniones</p>

            <h3 className="mt-3 text-4xl font-black md:text-5xl">
              Lo que dicen las clientas
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="rounded-[2rem] bg-[#fff8fb] p-8 shadow-xl shadow-pink-100"
              >
                <div className="mb-5 text-3xl">⭐️⭐️⭐️⭐️⭐️</div>

                <p className="leading-8 text-[#6d5c63]">
                  “{testimonial.text}”
                </p>

                <h4 className="mt-6 font-black text-[#d96f9b]">
                  {testimonial.name}
                </h4>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#fff1f6] p-8 md:p-12">
          <p className="font-black text-[#d96f9b]">Condiciones de reserva</p>

          <h3 className="mt-3 text-3xl font-black md:text-4xl">
            Información importante antes de agendar
          </h3>

          <div className="mt-8 grid gap-4 text-[#6d5c63]">
            <p>✅ La reserva se confirma con un abono de {business.deposit}.</p>
            <p>✅ El valor final puede variar según diseño, largo o técnica.</p>
            <p>✅ Se solicita puntualidad para respetar las horas agendadas.</p>
            <p>✅ En caso de cambios, avisar con anticipación por WhatsApp.</p>
          </div>
        </div>
      </section>

      <section id="contacto" className="bg-gradient-to-br from-[#d96f9b] to-[#b85b7f] px-5 py-24 text-white">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/20 bg-white/15 p-8 text-center shadow-2xl backdrop-blur-xl md:p-14">
          <p className="font-black text-pink-100">Contacto</p>

          <h3 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
            Agenda tu hora con Javiera
          </h3>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-pink-50">
            Escríbeme por WhatsApp o Instagram para consultar diseños, valores,
            disponibilidad y condiciones de atención.
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
          {business.name}
        </h3>

        <p className="mt-2 text-zinc-300">
          Uñas por {business.owner}
        </p>
      </footer>
    </main>
  )
}