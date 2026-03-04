import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { INTRO_DATA } from "../data";

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

  return (
    <section className="relative mx-auto mt-8 max-w-7xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-[34px] border border-[#ffd8a8] bg-gradient-to-br from-[#fff7e8] via-[#fff2dd] to-[#ffe2b8] p-6 shadow-[0_18px_45px_rgba(255,111,0,0.12)] md:p-10">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#ffbf73]/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[#ffd595]/40 blur-3xl" />

        <button
          type="button"
          aria-label="Previous"
          onClick={handlePrev}
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-300 bg-white/90 text-orange-600 shadow-sm transition hover:bg-orange-50 hover:border-orange-400 active:scale-95 md:left-5 md:h-11 md:w-11"
        >
          <span className="text-xl leading-none">&lsaquo;</span>
        </button>

        <button
          type="button"
          aria-label="Next"
          onClick={handleNext}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-300 bg-white/90 text-orange-600 shadow-sm transition hover:bg-orange-50 hover:border-orange-400 active:scale-95 md:right-5 md:h-11 md:w-11"
        >
          <span className="text-xl leading-none">&rsaquo;</span>
        </button>

        <div className="relative grid items-center gap-8 md:grid-cols-[1.08fr_0.92fr]">
          <div key={currentIndex} className="space-y-5 pl-8 pr-8 animate-[fadeIn_.35s_ease] md:pl-10">
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
                className="h-[280px] w-[280px] rounded-[20px] object-cover shadow-xl ring-4 ring-orange-100 animate-[zoomIn_.35s_ease] sm:h-[330px] sm:w-[330px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MangoIntroSection;
