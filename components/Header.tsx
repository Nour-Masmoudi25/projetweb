"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Calendar } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white border-b border-[#F4F4F4] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[#004C97] to-[#E2001A] rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <span className="font-montserrat font-bold text-xl text-[#004C97]">SUP'EVENT</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 hover:text-[#004C97] font-poppins font-semibold transition">
            Accueil
          </Link>
          <Link href="/events" className="text-gray-700 hover:text-[#004C97] font-poppins font-semibold transition">
            Événements
          </Link>
          <Link href="/calendar" className="text-gray-700 hover:text-[#004C97] font-poppins font-semibold transition">
            Calendrier
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-[#004C97] font-poppins font-semibold hover:text-[#003570] transition">
            Connexion
          </Link>
          <Link href="/register" className="sup-button-primary">
            S'inscrire
          </Link>
        </div>

        <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-gray-50 border-t border-[#F4F4F4] py-4 px-4 space-y-3">
          <Link href="/" className="block text-gray-700 hover:text-[#004C97] font-poppins font-semibold py-2">
            Accueil
          </Link>
          <Link href="/events" className="block text-gray-700 hover:text-[#004C97] font-poppins font-semibold py-2">
            Événements
          </Link>
          <Link href="/calendar" className="block text-gray-700 hover:text-[#004C97] font-poppins font-semibold py-2">
            Calendrier
          </Link>
          <Link href="/login" className="block text-[#004C97] font-poppins font-semibold py-2">
            Connexion
          </Link>
          <Link href="/register" className="block sup-button-primary">
            S'inscrire
          </Link>
        </nav>
      )}
    </header>
  )
}
