"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function CreateEventPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    category: "workshop",
    date: "",
    time: "",
    location: "",
    capacity: 50,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const token = localStorage.getItem("token")
    if (!token) {
      setError("Vous devez être connecté")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || "Erreur lors de la création")
      }

      alert("Événement créé avec succès ✅")
      router.push("/events")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Créer un événement</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="title"
            placeholder="Titre de l'événement"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <input
            name="image"
            placeholder="/images/bikefest.jpg"
            value={form.image}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="workshop">Atelier</option>
            <option value="conference">Conférence</option>
            <option value="competition">Compétition</option>
            <option value="sports">sport</option>
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="location"
            placeholder="Lieu"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Création..." : "Créer l'événement"}
          </button>
        </form>
      </section>

      <Footer />
    </main>
  )
}
