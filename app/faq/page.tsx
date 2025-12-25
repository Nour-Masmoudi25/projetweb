'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header />
      <section className="px-4 py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">FAQ</h1>
        <p className="text-gray-700">Ici tu peux ajouter les questions fréquemment posées.</p>
      </section>
      <Footer />
    </main>
  )
}
