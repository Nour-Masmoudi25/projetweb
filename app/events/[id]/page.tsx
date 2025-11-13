"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Calendar, MapPin, Users } from "lucide-react"
import Image from "next/image"

export default function EventDetailPage() {
  const params = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isRegistered, setIsRegistered] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${params.id}`)
        const data = await response.json()
        setEvent(data)
      } catch (error) {
        console.error("Error fetching event:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchEvent()
    }
  }, [params.id])

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 text-center">
          <p className="text-gray-500 font-open-sans">Chargement...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (!event) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 text-center">
          <p className="text-gray-500 font-open-sans">Événement non trouvé</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="relative w-full h-96 bg-gradient-to-br from-[#004C97] to-[#E2001A] overflow-hidden">
        {event.image ? (
          <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-16 relative z-10 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <span className="sup-event-badge bg-[#004C97] text-white">{event.category}</span>
          </div>

          <h1 className="font-montserrat font-bold text-4xl md:text-5xl text-[#000000] mb-4">{event.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#F4F4F4] rounded-lg flex items-center justify-center">
                <Calendar size={24} className="text-[#004C97]" />
              </div>
              <div>
                <p className="text-gray-600 font-open-sans text-sm">Date</p>
                <p className="font-montserrat font-bold text-lg">
                  {new Date(event.date).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#F4F4F4] rounded-lg flex items-center justify-center">
                <MapPin size={24} className="text-[#E2001A]" />
              </div>
              <div>
                <p className="text-gray-600 font-open-sans text-sm">Lieu</p>
                <p className="font-montserrat font-bold text-lg">{event.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#F4F4F4] rounded-lg flex items-center justify-center">
                <Users size={24} className="text-[#004C97]" />
              </div>
              <div>
                <p className="text-gray-600 font-open-sans text-sm">Participants</p>
                <p className="font-montserrat font-bold text-lg">
                  {event.registrationCount} / {event.capacity || "∞"}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-montserrat font-bold text-2xl text-[#000000] mb-4">Description</h2>
            <p className="text-gray-700 font-open-sans leading-relaxed text-lg">{event.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="font-montserrat font-bold text-2xl text-[#000000] mb-4">Organisateur</h2>
            <div className="bg-[#F4F4F4] rounded-lg p-6">
              <p className="font-montserrat font-bold text-lg text-[#000000]">
                {event.organizer?.clubName || `${event.organizer?.firstname} ${event.organizer?.lastname}`}
              </p>
              <p className="text-gray-600 font-open-sans mt-2">{event.organizer?.email}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="sup-button-primary flex-1">S'inscrire à cet Événement</button>
            <button className="sup-button-secondary flex-1">Partager</button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
