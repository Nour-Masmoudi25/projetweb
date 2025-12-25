"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-footer)] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-4">SUP'EVENT</h3>
            <p className="text-white/90 text-sm">
              Plateforme centralisée de gestion des événements universitaires de SUP'COM.
            </p>
          </div>

          <div>
            <h4 className="font-poppins font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-white/85 hover:text-[var(--color-accent)] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] rounded"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-white/85 hover:text-[var(--color-accent)] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] rounded"
                >
                  Événements
                </Link>
              </li>
              <li>
                <Link
                  href="/calendar"
                  className="text-white/85 hover:text-[var(--color-accent)] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] rounded"
                >
                  Calendrier
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/faq"
                  className="text-white/85 hover:text-[var(--color-accent)] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] rounded"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/85 hover:text-[var(--color-accent)] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] rounded"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/confidentialite"
                  className="text-white/85 hover:text-[var(--color-accent)] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] rounded"
                >
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-white/95">
                <Mail size={16} className="text-[var(--color-accent)]" aria-hidden />
                <span>support@supevent.com</span>
              </li>
              <li className="flex items-center gap-2 text-white/95">
                <Phone size={16} className="text-[var(--color-accent)]" aria-hidden />
                <span>+216 95 000 000</span>
              </li>
              <li className="flex items-center gap-2 text-white/95">
                <MapPin size={16} className="text-[var(--color-accent)]" aria-hidden />
                <span>SUP'COM, Tunis</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/80 text-sm">
              © {currentYear} SUP'EVENT. Tous droits réservés.
            </p>

            <div className="flex items-center gap-6">
              <nav aria-label="Réseaux sociaux" className="flex items-center gap-4">
                <Link
                  href="https://x.com/SUPCOM14"
                  className="text-white/85 hover:text-[var(--color-accent)] transition p-1 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </Link>
                <Link
                  href="https://www.linkedin.com/school/sup'com/"
                  className="text-white/85 hover:text-[var(--color-accent)] transition p-1 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </Link>
                <Link
                  href="https://www.facebook.com/supcom.universite.carthage/"
                  className="text-white/85 hover:text-[var(--color-accent)] transition p-1 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </Link>
              </nav>

              <div className="flex gap-4 text-sm">
                <Link
                  href="/terms"
                  className="text-white/80 hover:text-[var(--color-accent)] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] rounded"
                >
                  Conditions
                </Link>
                <Link
                  href="/support"
                  className="text-white/80 hover:text-[var(--color-accent)] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] rounded"
                >
                  Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
