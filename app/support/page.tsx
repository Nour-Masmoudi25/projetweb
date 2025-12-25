'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Support et Assistance</h1>

        <p className="mb-4 text-gray-700">
          Vous rencontrez un problème avec SUP'EVENT ? Nous sommes là pour vous aider. Notre équipe de support est disponible pour répondre à vos questions et résoudre vos soucis liés à l'utilisation de la plateforme.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Contactez-nous</h2>
        <p className="mb-4 text-gray-700">
          Pour toute demande, vous pouvez nous contacter par email ou téléphone :
        </p>
        <ul className="mb-4 list-disc list-inside text-gray-700">
          <li>Email : support@supevent.com</li>
          <li>Téléphone : +216 95 000 000</li>
          <li>Adresse : SUP'COM, Technopole El Ghazala, Tunis</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Questions fréquentes</h2>
        <p className="mb-4 text-gray-700">
          Avant de nous contacter, vous pouvez consulter notre page <a href="/faq" className="text-blue-600 underline">FAQ</a> pour trouver des réponses aux questions les plus fréquentes.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Assistance technique</h2>
        <p className="mb-4 text-gray-700">
          Si vous rencontrez un problème technique (connexion, affichage d'événements, inscription, etc.), veuillez fournir un maximum de détails pour que notre équipe puisse intervenir rapidement.
        </p>
      </section>

      <Footer />
    </main>
  )
}
