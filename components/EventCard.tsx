"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Users } from "lucide-react"

interface EventCardProps {
  event: {
    _id: string
    title: string
    description: string
    category: string
    date: string
    location: string
    image: string
    registrationCount: number
    capacity: number
  }
}

const categoryColors: Record<string, string> = {
  conference: "bg-blue-100 text-blue-700",
  workshop: "bg-green-100 text-green-700",
  social: "bg-purple-100 text-purple-700",
  sports: "bg-orange-100 text-orange-700",
  cultural: "bg-pink-100 text-pink-700",
}

const categoryLabels: Record<string, string> = {
  conference: "Conférence",
  workshop: "Atelier",
  social: "Social",
  sports: "Sport",
  cultural: "Culturel",
}

export default function EventCard({ event }: EventCardProps) {
  const categoryColor = categoryColors[event.category] || "bg-gray-100 text-gray-700"
  const categoryLabel = categoryLabels[event.category] || event.category

  return (
    <Link href={`/events/${event._id}`}>
      <div className="sup-card overflow-hidden h-full flex flex-col hover:scale-105 transition-transform duration-300 cursor-pointer">
        <div className="relative w-full h-48 bg-gradient-to-br from-[#004C97] to-[#E2001A]">
          {event.image ? (
            <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#004C97] to-[#E2001A] opacity-50"></div>
          )}
          <div className={`absolute top-4 right-4 sup-event-badge ${categoryColor}`}>{categoryLabel}</div>
        </div>

        <div className="flex-1 p-6 flex flex-col">
          <h3 className="font-montserrat font-bold text-lg text-[#000000] mb-2 line-clamp-2">{event.title}</h3>
          <p className="text-gray-600 font-open-sans text-sm mb-4 line-clamp-2">{event.description}</p>

          <div className="space-y-3 mt-auto text-sm text-gray-700 font-open-sans">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#004C97]" />
              <span>{new Date(event.date).toLocaleDateString("fr-FR")}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#E2001A]" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-[#004C97]" />
              <span>
                {event.registrationCount} / {event.capacity || "∞"} inscrits
              </span>
            </div>
          </div>

          <button className="sup-button-primary w-full mt-6">Voir Détails</button>
        </div>
      </div>
    </Link>
  )
}
