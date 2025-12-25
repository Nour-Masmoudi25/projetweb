'use client'

import { useEffect, useState } from 'react'
import type { CalendarDay } from 'react-day-picker'
import { Calendar, CalendarDayButton } from '@/components/ui/calendar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { X, MapPin, Clock } from 'lucide-react'

interface Event {
  _id: string
  title: string
  description: string
  date: string
  time?: string
  location: string
}

// Helper pour normaliser les dates sans fuseau
const formatDateKey = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

// Helper pour parser les dates ISO en ignorant le fuseau horaire
const parseISODateLocal = (dateString: string) => {
  // Extract just the date part (YYYY-MM-DD) from ISO string
  const datePart = dateString.split('T')[0]
  const [year, month, day] = datePart.split('-').map(Number)
  // Create date in local timezone
  return new Date(year, month - 1, day)
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDateEvents, setSelectedDateEvents] = useState<Event[] | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/events')
        const data = await res.json()
        setEvents(data)
        console.log('Fetched events:', data)
      } catch (err) {
        console.error('Erreur lors du fetch des événements:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  // Regrouper les événements par date
  const eventsByDate = events.reduce<Record<string, Event[]>>((acc, ev) => {
    const evDate = parseISODateLocal(ev.date)
    console.log('Processing event:', ev.title, 'Raw date:', ev.date, 'Parsed date:', evDate)
    const dateKey = formatDateKey(evDate)
    console.log('Date key:', dateKey)
    if (!acc[dateKey]) acc[dateKey] = []
    acc[dateKey].push(ev)
    return acc
  }, {})

  console.log('Events by date:', eventsByDate)
  console.log('All date keys:', Object.keys(eventsByDate))

  const openDateEvents = (date: Date) => {
    const dateKey = formatDateKey(date)
    console.log('Opening date:', dateKey, 'Events:', eventsByDate[dateKey])
    setSelectedDate(date)
    setSelectedDateEvents(eventsByDate[dateKey] || [])
  }

  const closeModal = () => {
    setSelectedDateEvents(null)
    setSelectedDate(null)
  }

  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <section className="px-4 py-12 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Calendrier des événements
          </h1>
          <p className="text-gray-600">
            Cliquez sur une date pour voir les événements
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <Calendar
              className="mx-auto"
              components={{
                DayButton: ({ day, modifiers, ...props }) => {
                  let dateObj: Date
                  if (day instanceof Date) {
                    dateObj = day
                  } else {
                    const calDay = day as CalendarDay
                    dateObj = calDay.date instanceof Date ? calDay.date : new Date(calDay.date)
                  }

                  // Forced event dots
                  const forcedIndicators = (
                    <>
                      {/* Formation SOS – 16 Nov 2024 */}
                      {dateObj.getDate() === 16 && dateObj.getMonth() === 10 && dateObj.getFullYear() === 2024 && (
                        <span className="w-2 h-2 rounded-full bg-green-500" title="Formation SOS" />
                      )}

                      {/* Wiempower – 1 Nov 2025 */}
                      {dateObj.getDate() === 1 && dateObj.getMonth() === 10 && dateObj.getFullYear() === 2025 && (
                        <span className="w-2 h-2 rounded-full bg-blue-500" title="Wiempower" />
                      )}

                      {/* Forum – 12 Nov 2025 */}
                      {dateObj.getDate() === 12 && dateObj.getMonth() === 10 && dateObj.getFullYear() === 2025 && (
                        <span className="w-2 h-2 rounded-full bg-red-500" title="Forum" />
                      )}
                    </>
                  )

                  const calendarDay: CalendarDay = {
                    date: dateObj,
                    dateLib: undefined as any,
                    outside: false,
                    displayMonth: new Date(dateObj.getFullYear(), dateObj.getMonth(), 1),
                    isEqualTo(other: any) {
                      const otherDate = other?.date ?? other
                      const otherTime =
                        otherDate instanceof Date
                          ? otherDate.getTime()
                          : new Date(otherDate).getTime()
                      return dateObj.getTime() === otherTime
                    },
                  }

                  return (
                    <CalendarDayButton
                      day={calendarDay}
                      modifiers={modifiers}
                      {...props}
                      onClick={() => openDateEvents(dateObj)}
                      indicators={forcedIndicators}
                    />
                  )
                },
              }}
            />

         
          </div>
        )}

        {/* Stats section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{events.length}</p>
                <p className="text-sm text-gray-600">Événements totaux</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{Object.keys(eventsByDate).length}</p>
                <p className="text-sm text-gray-600">Jours avec événements</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {new Set(events.map(e => e.location)).size}
                </p>
                <p className="text-sm text-gray-600">Lieux différents</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal pour les événements du jour */}
      {selectedDateEvents && selectedDate && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <h2 className="text-2xl font-bold">Événements</h2>
                  <p className="text-white/90 text-sm mt-1">
                    {formatDisplayDate(selectedDate)}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {selectedDateEvents.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500 text-lg">Aucun événement ce jour</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {selectedDateEvents.map((ev, index) => (
                    <li 
                      key={ev._id} 
                      className="border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'slideIn 0.3s ease-out forwards'
                      }}
                    >
                      <h3 className="font-bold text-xl text-gray-800 mb-2">
                        {ev.title}
                      </h3>
                      <p className="text-gray-700 mb-3 leading-relaxed">
                        {ev.description}
                      </p>
                      <div className="flex flex-wrap gap-3 mb-4 text-sm">
                        {ev.time && (
                          <div className="flex items-center gap-2 text-gray-600 bg-blue-50 px-3 py-1.5 rounded-full">
                            <Clock className="w-4 h-4" />
                            <span>{ev.time}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-gray-600 bg-purple-50 px-3 py-1.5 rounded-full">
                          <MapPin className="w-4 h-4" />
                          <span>{ev.location}</span>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                        onClick={() => alert(`Inscription à ${ev.title} (à implémenter)`)}
                      >
                        S'inscrire à cet événement
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  )
}