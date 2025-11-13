"use client"

import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#000000] text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-4">SUP'EVENT</h3>
            <p className="text-gray-400 font-open-sans text-sm">
              Plateforme centralisée de gestion des événements universitaires SUP'COM.
            </p>
          </div>

          <div>
            <h4 className="font-poppins font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 font-open-sans text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-[#E2001A] transition">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#E2001A] transition">
                  Événements
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-[#E2001A] transition">
                  Calendrier
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-semibold mb-4">Support</h4>
            <ul className="space-y-2 font-open-sans text-sm text-gray-400">
              <li>
                <Link href="/faq" className="hover:text-[#E2001A] transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E2001A] transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#E2001A] transition">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 font-open-sans text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#E2001A]" />
                <span>support@supevent.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#E2001A]" />
                <span>+216 95 000 000</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-[#E2001A]" />
                <span>SUP'COM, Tunis</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 font-open-sans text-sm mb-4 md:mb-0">
              © {currentYear} SUP'EVENT. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-400 hover:text-[#E2001A] transition font-open-sans text-sm">
                Twitter
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#E2001A] transition font-open-sans text-sm">
                LinkedIn
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#E2001A] transition font-open-sans text-sm">
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
