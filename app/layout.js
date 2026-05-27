import { Poppins, Great_Vibes } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
})

export const metadata = {
  metadataBase: new URL("https://javiera-nails.netlify.app"),

  title: {
    default: "Javiera Nails | Manicurista certificada en Conchalí",
    template: "%s | Javiera Nails",
  },

  description:
    "Agenda tu hora con Javiera Nails, manicurista certificada desde 2020 en Honestudio, Santiago, Conchalí. Esmaltado permanente, soft gel, nivelación y baño acrílico.",

  keywords: [
    "Javiera Nails",
    "jaavieranailss",
    "uñas Conchalí",
    "manicure Conchalí",
    "esmaltado permanente",
    "soft gel",
    "nivelación base rubber",
    "baño acrílico",
    "manicurista Santiago",
  ],

  authors: [{ name: "Javiera Valenzuela" }],

  openGraph: {
    title: "Javiera Nails | Agenda tu hora",
    description:
      "Manicurista certificada desde 2020 en Honestudio, Santiago, Conchalí. Esmaltado permanente, soft gel, nivelación y baño acrílico.",
    url: "https://javiera-nails.netlify.app",
    siteName: "Javiera Nails",
    images: [
      {
        url: "/galeria/logo.png",
        width: 1200,
        height: 630,
        alt: "Logo Javiera Nails",
      },
    ],
    locale: "es_CL",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Javiera Nails | Agenda tu hora",
    description:
      "Manicurista certificada en Santiago, Conchalí. Esmaltado permanente, soft gel, nivelación y baño acrílico.",
    images: ["/galeria/logo.png"],
  },

  icons: {
    icon: "/galeria/logo.png",
    apple: "/galeria/logo.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} ${greatVibes.variable}`}>
        {children}
      </body>
    </html>
  )
}