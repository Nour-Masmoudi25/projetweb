"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Plus, Edit2, Trash2, Eye, LogOut } from "lucide-react"

interface UserData {
  id: string
  firstname: string
  lastname: string
  email: string
  role: string
  clubName?: string
}

interface Event {
  _id: string
  title: string
  description: string
  date: string
  category: string
  status: string
  registrationCount: number
  capacity: number
}

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "conference",
    date: "",
    time: "",
    location: "",
    capacity: 100,
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/login")
      return
    }

    try {
      const parsed = JSON.parse(userData)
      if (parsed.role !== "club" && parsed.role !== "admin") {
        router.push("/dashboard")
        return
      }
      setUser(parsed)
      fetchEvents()
    } catch (err) {
      router.push("/login")
    }
  }, [router])

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        // Only show events created by this user
        setEvents(data)
      }
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({
          title: "",
          description: "",
          category: "conference",
          date: "",
          time: "",
          location: "",
          capacity: 100,
        })
        setShowCreateForm(false)
        fetchEvents()
      }
    } catch (error) {
      console.error("Error creating event:", error)
    }
  }

  const handleDeleteEvent = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet événement?")) {
      try {
        const token = localStorage.getItem("token")
        // Note: Delete endpoint should be added to backend
        await fetch(`http://localhost:5000/api/events/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        })
        fetchEvents()
      } catch (error) {
        console.error("Error deleting event:", error)
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 text-center">
          <p className="text-gray-500 font-open-sans">Chargement du tableau de bord...</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-[#004C97] to-[#E2001A] py-12 px-4 md:px-8 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-montserrat font-bold text-4xl mb-2">
              {user.role === "admin" ? "Tableau de Bord Admin" : "Gestion des Événements"}
            </h1>
            <p className="font-open-sans text-lg opacity-90">{user.clubName || user.firstname + " " + user.lastname}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white text-[#E2001A] px-6 py-3 rounded-lg font-poppins font-bold hover:bg-gray-100 transition"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-montserrat font-bold text-2xl text-[#000000]">Mes Événements</h2>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="sup-button-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Créer un Événement
          </button>
        </div>

        {showCreateForm && (
          <div className="sup-card p-8 mb-8">
            <h3 className="font-montserrat font-bold text-xl text-[#000000] mb-6">Créer un nouvel événement</h3>
            <form onSubmit={handleCreateEvent} className="space-y-5">
              <div>
                <label className="block font-poppins font-semibold text-gray-700 mb-2">Titre</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004C97] font-open-sans"
                />
              </div>

              <div>
                <label className="block font-poppins font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004C97] font-open-sans h-32"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-poppins font-semibold text-gray-700 mb-2">Catégorie</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004C97] font-open-sans"
                  >
                    <option value="conference">Conférence</option>
                    <option value="workshop">Atelier</option>
                    <option value="social">Social</option>
                    <option value="sports">Sports</option>
                    <option value="cultural">Culturel</option>
                  </select>
                </div>

                <div>
                  <label className="block font-poppins font-semibold text-gray-700 mb-2">Capacité</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004C97] font-open-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-poppins font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004C97] font-open-sans"
                  />
                </div>

                <div>
                  <label className="block font-poppins font-semibold text-gray-700 mb-2">Heure</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004C97] font-open-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block font-poppins font-semibold text-gray-700 mb-2">Lieu</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004C97] font-open-sans"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="sup-button-primary flex-1">
                  Créer l'événement
                </button>
                <button type="button" onClick={() => setShowCreateForm(false)} className="sup-button-secondary flex-1">
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="text-gray-500 font-open-sans">Chargement des événements...</p>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 font-open-sans mb-4">Vous n'avez pas encore créé d'événement</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {events.map((event) => (
              <div key={event._id} className="sup-card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-montserrat font-bold text-xl text-[#000000] mb-2">{event.title}</h3>
                    <p className="text-gray-600 font-open-sans mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm font-open-sans text-gray-600">
                      <span>📅 {new Date(event.date).toLocaleDateString("fr-FR")}</span>
                      <span>🏷️ {event.category}</span>
                      <span>
                        👥 {event.registrationCount} / {event.capacity} inscrits
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full font-poppins font-semibold ${
                          event.status === "published"
                            ? "bg-green-100 text-green-700"
                            : event.status === "draft"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {event.status === "published" ? "Publié" : event.status === "draft" ? "Brouillon" : "Annulé"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Link
                      href={`/events/${event._id}`}
                      className="p-3 bg-[#F4F4F4] text-[#004C97] rounded-lg hover:bg-gray-300 transition"
                      title="Voir"
                    >
                      <Eye size={20} />
                    </Link>
                    <button
                      className="p-3 bg-[#F4F4F4] text-[#004C97] rounded-lg hover:bg-gray-300 transition"
                      title="Éditer"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="p-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition"
                      title="Supprimer"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
