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
  title: "Javiera Nails",
  description: "Manicurista certificada en Santiago, Conchalí",
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