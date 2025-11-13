"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { LogOut, User, BookOpen, Settings } from "lucide-react"

interface UserData {
  id: string
  firstname: string
  lastname: string
  email: string
  role: string
  clubName?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/login")
      return
    }

    try {
      setUser(JSON.parse(userData))
      fetchRegistrations(token)
    } catch (err) {
      console.error("Error loading user data:", err)
      router.push("/login")
    }
  }, [router])

  const fetchRegistrations = async (token: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/registrations", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setRegistrations(data)
      }
    } catch (error) {
      console.error("Error fetching registrations:", error)
    } finally {
      setLoading(false)
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
          <p className="text-gray-500 font-open-sans">Chargement du profil...</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-[#004C97] to-[#E2001A] py-12 px-4 md:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-montserrat font-bold text-4xl mb-2">Bienvenue, {user.firstname}!</h1>
          <p className="font-open-sans text-lg opacity-90">Gérez votre profil et vos inscriptions aux événements</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sup-card p-6 sticky top-20">
              <nav className="space-y-3">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-poppins font-semibold ${
                    activeTab === "overview"
                      ? "bg-[#004C97] text-white"
                      : "bg-[#F4F4F4] text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <User size={20} />
                  Mon Profil
                </button>
                <button
                  onClick={() => setActiveTab("registrations")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-poppins font-semibold ${
                    activeTab === "registrations"
                      ? "bg-[#004C97] text-white"
                      : "bg-[#F4F4F4] text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <BookOpen size={20} />
                  Mes Inscriptions
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-poppins font-semibold ${
                    activeTab === "settings"
                      ? "bg-[#004C97] text-white"
                      : "bg-[#F4F4F4] text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <Settings size={20} />
                  Paramètres
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition font-poppins font-semibold"
                >
                  <LogOut size={20} />
                  Se Déconnecter
                </button>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === "overview" && (
              <div className="sup-card p-8">
                <h2 className="font-montserrat font-bold text-2xl text-[#000000] mb-8">Mon Profil</h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-600 font-open-sans text-sm mb-1">Nom Complet</p>
                    <p className="font-montserrat font-bold text-lg text-[#000000]">
                      {user.firstname} {user.lastname}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-open-sans text-sm mb-1">Email</p>
                    <p className="font-montserrat font-bold text-lg text-[#000000]">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-open-sans text-sm mb-1">Type de Compte</p>
                    <p className="font-montserrat font-bold text-lg text-[#000000]">
                      {user.role === "student" ? "Étudiant" : user.role === "club" ? "Club" : "Admin"}
                    </p>
                  </div>
                  {user.clubName && (
                    <div>
                      <p className="text-gray-600 font-open-sans text-sm mb-1">Nom du Club</p>
                      <p className="font-montserrat font-bold text-lg text-[#000000]">{user.clubName}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "registrations" && (
              <div className="sup-card p-8">
                <h2 className="font-montserrat font-bold text-2xl text-[#000000] mb-8">Mes Inscriptions</h2>
                {loading ? (
                  <p className="text-gray-500 font-open-sans">Chargement des inscriptions...</p>
                ) : registrations.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 font-open-sans mb-4">Vous n'êtes inscrit à aucun événement</p>
                    <Link href="/events" className="sup-button-primary inline-block">
                      Découvrir les événements
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {registrations.map((reg: any) => (
                      <div key={reg._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <h3 className="font-montserrat font-bold text-lg text-[#000000]">
                          {reg.event?.title || "Événement"}
                        </h3>
                        <p className="text-gray-600 font-open-sans text-sm mt-1">
                          Inscrit le {new Date(reg.registeredAt).toLocaleDateString("fr-FR")}
                        </p>
                        <span
                          className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-poppins font-semibold ${
                            reg.status === "registered"
                              ? "bg-blue-100 text-blue-700"
                              : reg.status === "attended"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {reg.status === "registered" ? "Inscrit" : reg.status === "attended" ? "Participé" : "Annulé"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="sup-card p-8">
                <h2 className="font-montserrat font-bold text-2xl text-[#000000] mb-8">Paramètres</h2>
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="font-poppins font-semibold text-lg text-[#000000] mb-2">Notifications</h3>
                    <p className="text-gray-600 font-open-sans mb-4">Gérez vos préférences de notifications</p>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="font-open-sans text-gray-700">Recevoir les notifications par email</span>
                    </label>
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-lg text-[#000000] mb-4">Danger</h3>
                    <button className="border-2 border-red-700 text-red-700 px-6 py-3 rounded-lg font-poppins font-bold hover:bg-red-50 transition">
                      Supprimer mon compte
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
