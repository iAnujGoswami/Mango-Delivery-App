import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { INTRO_DATA } from "../data";
import { FALLBACK_PRODUCT_IMAGE } from "../lib/products";

function MangoIntroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % INTRO_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + INTRO_DATA.length) % INTRO_DATA.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  if (!INTRO_DATA.length) {
    return null;
  }

  const currentItem = INTRO_DATA[currentIndex];
  const previewProducts = INTRO_DATA.map((item) => ({
    id: item.title,
    image: item.image || FALLBACK_PRODUCT_IMAGE,
    name: item.title,
    price: "Fresh Picks",
  }));

  return (
    <section className="relative mx-auto mt-8 max-w-7xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-[34px] border border-[#ffd8a8] bg-gradient-to-br from-[#fff7e8] via-[#fff2dd] to-[#ffe2b8] p-6 shadow-[0_18px_45px_rgba(255,111,0,0.12)] md:p-10">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#ffbf73]/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[#ffd595]/40 blur-3xl" />

        <button
          type="button"
          aria-label="Previous"
          onClick={handlePrev}
          className="absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-orange-300 bg-white/90 text-orange-600 shadow-sm transition hover:border-orange-400 hover:bg-orange-50 active:scale-95 md:left-5 md:h-11 md:w-11"
        >
          <span className="text-xl leading-none">&lsaquo;</span>
        </button>

        <button
          type="button"
          aria-label="Next"
          onClick={handleNext}
          className="absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-orange-300 bg-white/90 text-orange-600 shadow-sm transition hover:border-orange-400 hover:bg-orange-50 active:scale-95 md:right-5 md:h-11 md:w-11"
        >
          <span className="text-xl leading-none">&rsaquo;</span>
        </button>

        <div className="relative grid items-center gap-8 md:grid-cols-[1.08fr_0.92fr]">
          <div key={currentIndex} className="animate-[fadeIn_.35s_ease] space-y-5 pl-8 pr-8 md:pl-10">
            <p className="inline-flex rounded-full border border-[#ffcc8c] bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#ad5a00]">
              Farm Fresh Daily
            </p>

            <h1 className="text-4xl leading-tight text-[#d05a00] tenor-sans sm:text-5xl md:text-6xl">
              {currentItem.title}
            </h1>

            <p className="max-w-xl text-base text-[#5f4a34] sm:text-lg">{currentItem.description}</p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="rounded-full bg-[#ff7a00] px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-[#e76900]"
              >
                Shop Now
              </button>
              <button
                type="button"
                onClick={() => navigate("/about")}
                className="rounded-full border border-[#ffb25b] bg-white/80 px-6 py-3 font-semibold text-[#8a4700] transition hover:bg-[#ffe7bf]"
              >
                Learn More
              </button>
            </div>

            <div className="flex items-center gap-2 pt-2">
              {INTRO_DATA.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => handleDotClick(index)}
                  className={`h-2.5 rounded-full transition ${
                    index === currentIndex ? "w-8 bg-[#ff7a00]" : "w-2.5 bg-[#ffc989] hover:bg-[#ffb868]"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center md:justify-end md:pr-8">
            <div className="rounded-[26px] border border-[#ffcf90] bg-white/70 p-2 shadow-lg">
              <img
                key={currentIndex}
                src={currentItem.image}
                alt={currentItem.title}
                className="h-[280px] w-[280px] animate-[zoomIn_.35s_ease] rounded-[20px] object-cover shadow-xl ring-4 ring-orange-100 sm:h-[330px] sm:w-[330px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7 rounded-3xl border border-[#ffd8a8] bg-[#fff7e8] p-5 shadow-sm md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl text-[#8a4700] tenor-sans">Popular Picks</h2>
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="rounded-full border border-[#ffb25b] bg-white px-4 py-2 text-sm font-semibold text-[#8a4700] transition hover:bg-[#ffe7bf]"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {previewProducts.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-[#ffd8a8] bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-full rounded-xl bg-[#fffaf0] object-contain"
              />
              <h3 className="mt-2 truncate text-sm font-semibold text-[#8a4700]">{item.name}</h3>
              <p className="text-sm font-bold text-[#4b3b2b]">{item.price}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-[#ffd8a8] bg-gradient-to-r from-[#fff7e8] to-[#ffeacc] p-5 shadow-sm md:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#ad5a00]">
          10-Minute Delivery Cities
        </p>
        <h2 className="mt-1 text-2xl text-[#8a4700] tenor-sans">Where We Deliver Fast</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {["Chatrapati Sambhajinagar", "Pune", "Mumbai", "Bangalore"].map((city) => (
            <span
              key={city}
              className="rounded-full border border-[#ffcf90] bg-white px-4 py-2 text-sm font-semibold text-[#7a4306]"
            >
              {city}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MangoIntroSection;
