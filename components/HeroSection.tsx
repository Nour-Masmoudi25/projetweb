"use client"

export default function HeroSection() {
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
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-[#004C97] font-montserrat font-bold uppercase px-8 py-4 rounded-lg hover:bg-gray-100 transition">
              Explorer les Événements
            </button>
            <button className="border-2 border-white text-white font-montserrat font-bold uppercase px-8 py-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition">
              En Savoir Plus
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mb-48"></div>
    </section>
  )
}
