import mangoImage from "../assets/mango.jpg"; // Add image here

function MangoIntroSection() {
  return (
    <section className="relative max-w-7xl mx-auto px-25 mt-10 grid md:grid-cols-2 items-center bg-[#fff7e8] border border-[#ffd8a8] rounded-[28px] shadow-[0_10px_30px_rgba(255,111,0,0.08)] py-10">
      <button
        type="button"
        aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-orange-300 bg-white text-orange-600 shadow-sm transition hover:bg-orange-50 hover:border-orange-400 active:scale-95"
      >
        <span className="text-xl leading-none">❮</span>
      </button>

      <button
        type="button"
        aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-orange-300 bg-white text-orange-600 shadow-sm transition hover:bg-orange-50 hover:border-orange-400 active:scale-95"
      >
        <span className="text-xl leading-none">❯</span>
      </button>
      
      <div className="space-y-6">
        <h1 className="text-6xl font-light text-[#ff6f00] tenor-sans">
          Fresh Farm Mangoes
        </h1>

        <p className="text-xl text-[#555555] tenor-sans whitespace-nowrap">
          Tropical Mangoes Delivered to Your Doorstep Within 10 minutes
        </p>

        <button className="mt-4 px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
          Shop Now
        </button>
      </div>

      <div className="flex justify-center md:justify-end">
        <img
          src={mangoImage}
          alt="Mangoes"
          className="w-[310px] rounded-[20px] shadow-xl ring-4 ring-orange-100"
        />
      </div>
    </section>
  );
}

export default MangoIntroSection;
