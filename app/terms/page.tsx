'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Conditions Générales d'Utilisation</h1>

        <p className="mb-4 text-gray-700">
          Bienvenue sur SUP'EVENT, la plateforme centralisée de gestion des événements universitaires de SUP'COM. 
          En utilisant notre site, vous acceptez les présentes conditions générales d'utilisation.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Accès et utilisation</h2>
        <p className="mb-4 text-gray-700">
          Vous vous engagez à utiliser SUP'EVENT de manière responsable et à ne pas perturber le fonctionnement du site. 
          L'accès au site est réservé aux étudiants, enseignants et membres autorisés de SUP'COM.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Contenu et responsabilités</h2>
        <p className="mb-4 text-gray-700">
          Toutes les informations publiées sur la plateforme sont fournies à titre indicatif. SUP'EVENT décline toute responsabilité en cas d'erreur, d'omission ou de mise à jour non effectuée.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Protection des données</h2>
        <p className="mb-4 text-gray-700">
          Vos informations personnelles sont traitées conformément à notre politique de confidentialité. Veuillez consulter la page <a href="/confidentialite" className="text-blue-600 underline">Confidentialité</a> pour plus de détails.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Modifications des conditions</h2>
        <p className="mb-4 text-gray-700">
          SUP'EVENT se réserve le droit de modifier ces conditions à tout moment. Les utilisateurs seront informés des changements via le site.
        </p>
      </section>

      <Footer />
    </main>
  )
}
