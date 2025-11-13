import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Montserrat, Open_Sans, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" })
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300','400','500','600','700'], // <-- must include one or more available weights
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: "SUP'EVENT - Gestion des Événements",
  description: "Plateforme de gestion centralisée des événements universitaires SUP'COM",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  )
}
