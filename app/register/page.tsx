"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Mail, Lock, Building2, Loader } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "student",
    clubName: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="font-montserrat font-bold text-3xl text-[#000000] mb-2">S'inscrire</h1>
            <p className="text-gray-600 font-open-sans mb-8">Créez un compte pour rejoindre la communauté SUP'EVENT.</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 font-open-sans">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-poppins font-semibold text-gray-700 mb-2">Prénom</label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="Jean"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004C97] font-open-sans"
                  />
                </div>
                <div>
                  <label className="block font-poppins font-semibold text-gray-700 mb-2">Nom</label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Dupont"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004C97] font-open-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block font-poppins font-semibold text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004C97] font-open-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block font-poppins font-semibold text-gray-700 mb-2">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004C97] font-open-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block font-poppins font-semibold text-gray-700 mb-2">Type de compte</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004C97] font-open-sans"
                >
                  <option value="student">Étudiant</option>
                  <option value="club">Club</option>
                </select>
              </div>

              {formData.role === "club" && (
                <div>
                  <label className="block font-poppins font-semibold text-gray-700 mb-2">Nom du club</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="clubName"
                      value={formData.clubName}
                      onChange={handleChange}
                      placeholder="Nom de votre club"
                      required={formData.role === "club"}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004C97] font-open-sans"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="sup-button-primary w-full flex items-center justify-center gap-2 mt-6"
              >
                {loading && <Loader className="w-4 h-4 animate-spin" />}
                {loading ? "Inscription en cours..." : "S'inscrire"}
              </button>
            </form>

            <p className="text-center text-gray-600 font-open-sans mt-6">
              Vous avez déjà un compte?{" "}
              <Link href="/login" className="text-[#004C97] font-semibold hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
