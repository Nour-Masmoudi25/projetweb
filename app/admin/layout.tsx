"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (!token || !user) {
      router.push("/login")
      return
    }

    try {
      const userData = JSON.parse(user)
      if (userData.role !== "club" && userData.role !== "admin") {
        router.push("/dashboard")
      }
    } catch {
      router.push("/login")
    }
  }, [router])

  return children
}
