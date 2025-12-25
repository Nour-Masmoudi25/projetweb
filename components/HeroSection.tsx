"use client"

import { useRouter } from "next/navigation"

export default function HeroSection() {
  const router = useRouter()

  return (
    <section className="sup-gradient py-20 md:py-32 px-4 md:px-8 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-montserrat font-bold mb-6 leading-tight">
            Découvrez les Événements Universitaires
          </h1>
          <p className="text-xl md:text-2xl font-open-sans mb-8 opacity-95">
            Centralisons la vie associative. Trouvez, inscrivez-vous et participez aux événements les plus dynamiques de
            SUP'COM.
          </p>
          <div className="flex">
            <button
              onClick={() => router.push("/events")}
              className="
                bg-white text-[#004C97] font-montserrat font-bold uppercase px-10 py-5 rounded-lg 
                shadow-lg transform transition duration-300 ease-in-out 
                hover:scale-105 hover:bg-gray-100 
                active:scale-95 active:bg-[#FFD700] 
                focus:outline-none focus:ring-4 focus:ring-yellow-300
              "
            >
              Explorer les Événements
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mb-48"></div>
    </section>
  )
}
