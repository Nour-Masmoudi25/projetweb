"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import EventsGrid from "@/components/EventsGrid"
import Footer from "@/components/Footer"

export default function Home() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events")
        const data = await response.json()
        setEvents(data)
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="sup-section-title">Événements à Venir</h2>
          <p className="text-gray-600 text-lg font-open-sans max-w-3xl">
            Découvrez les événements les plus intéressants de SUP'COM. Trouvez celui qui vous correspond et
            inscrivez-vous en quelques clics.
          </p>
        </div>
        <EventsGrid events={events} loading={loading} />
      </section>
      <Footer />
    </main>
  )
}
