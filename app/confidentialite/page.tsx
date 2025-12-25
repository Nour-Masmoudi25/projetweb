'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />
      <section className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <h1 className="text-3xl font-bold">Politique de Confidentialité</h1>
        <p>
          Nous attachons une grande importance à la protection de vos données personnelles.
          Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
        </p>

        <h2 className="text-xl font-semibold">Collecte des données</h2>
        <p>
          Nous collectons uniquement les informations nécessaires pour l’inscription, la participation aux événements
          et la communication avec nos utilisateurs.
        </p>

        <h2 className="text-xl font-semibold">Utilisation des données</h2>
        <p>
          Les données collectées sont utilisées uniquement pour gérer les événements et vous envoyer des informations
          relatives à votre compte ou à nos services.
        </p>

        <h2 className="text-xl font-semibold">Protection des données</h2>
        <p>
          Nous mettons en place des mesures techniques et organisationnelles pour protéger vos informations contre
          tout accès non autorisé, modification ou divulgation.
        </p>

        <h2 className="text-xl font-semibold">Vos droits</h2>
        <p>
          Vous pouvez demander l’accès, la modification ou la suppression de vos données personnelles à tout moment
          en nous contactant via la page Contact.
        </p>
      </section>
      <Footer />
    </main>
  )
}
