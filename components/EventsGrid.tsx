"use client"

import EventCard from "./EventCard"

interface Event {
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

interface EventsGridProps {
  events: Event[]
  loading: boolean
}

export default function EventsGrid({ events, loading }: EventsGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="sup-card p-6 h-96 animate-pulse bg-gray-200"></div>
        ))}
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg font-open-sans">Aucun événement disponible pour le moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  )
}
