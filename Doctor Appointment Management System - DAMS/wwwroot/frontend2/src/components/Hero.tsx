

function Hero() {
  return (
    <div>
      <section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-15 mt-5">
      <div>
        <div className="max-w-lg md:max-w-none">
          <h2 className="text-6xl font-semibold text-gray-900 sm:text-5xl">
            Providing quality healthcare, one appointment at a time.
          </h2>

          <p className="mt-4 text-gray-700 text-2xl">
          Our hospital management system simplifies scheduling, medical record management, and patient care. With AI-driven appointment recommendations and seamless doctor-patient interactions, we ensure a smoother and more efficient healthcare experience.
          </p>
        </div>
      </div>

      <div>
        <img
          src="src/assets/doctors.jpg"
          className="rounded w-xl h-xl"
          alt=""
        />
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Hero
