"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import EventsGrid from "@/components/EventsGrid"
import { Filter } from "lucide-react"

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let url = "http://localhost:5000/api/events"
        const params = new URLSearchParams()

        if (selectedCategory !== "all") {
          params.append("category", selectedCategory)
        }
        if (searchTerm) {
          params.append("search", searchTerm)
        }

        if (params.toString()) {
          url += "?" + params.toString()
        }

        const response = await fetch(url)
        const data = await response.json()
        setEvents(data)
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(fetchEvents, 300)
    return () => clearTimeout(timer)
  }, [selectedCategory, searchTerm])

  const categories = [
    { id: "all", label: "Tous" },
    { id: "conference", label: "Conférences" },
    { id: "workshop", label: "Ateliers" },
    { id: "social", label: "Social" },
    { id: "sports", label: "Sports" },
    { id: "cultural", label: "Culturel" },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-[#004C97] to-[#E2001A] py-12 px-4 md:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-8">Tous les Événements</h1>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <input
              type="text"
              placeholder="Rechercher un événement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004C97] font-open-sans text-black"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-8 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 text-gray-700 font-poppins font-semibold">
            <Filter size={20} className="text-[#004C97]" />
            Filtrer par catégorie :
          </div>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-poppins font-semibold transition ${
                selectedCategory === cat.id ? "sup-gradient text-white" : "bg-[#F4F4F4] text-gray-700 hover:bg-gray-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <EventsGrid events={events} loading={loading} />
      </div>

      <Footer />
    </main>
  )
}
