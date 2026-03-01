import { useState } from "react";
import { INTRO_DATA } from "../data";

function MangoIntroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % INTRO_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + INTRO_DATA.length) % INTRO_DATA.length);
  };

  if (!INTRO_DATA.length) {
    return null;
  }

  const currentItem = INTRO_DATA[currentIndex];

  return (
    <section className="relative max-w-7xl mx-auto px-25 mt-10 grid md:grid-cols-2 items-center bg-[#fff7e8] border border-[#ffd8a8] rounded-[28px] shadow-[0_10px_30px_rgba(255,111,0,0.08)] py-10">
      <button
        type="button"
        aria-label="Previous"
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-orange-300 bg-white text-orange-600 shadow-sm transition hover:bg-orange-50 hover:border-orange-400 active:scale-95"
      >
        <span className="text-xl leading-none">&lsaquo;</span>
      </button>

      <button
        type="button"
        aria-label="Next"
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-orange-300 bg-white text-orange-600 shadow-sm transition hover:bg-orange-50 hover:border-orange-400 active:scale-95"
      >
        <span className="text-xl leading-none">&rsaquo;</span>
      </button>

      <div key={currentIndex} className="space-y-6 animate-[fadeIn_.35s_ease]">
        <h1 className="text-6xl font-light text-[#ff6f00] tenor-sans">{currentItem.title}</h1>

        <p className="text-xl text-[#555555] tenor-sans whitespace-nowrap">{currentItem.description}</p>

        <button className="mt-4 px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
          Shop Now
        </button>
      </div>

      <div className="flex justify-center md:justify-end">
        <img
          key={currentIndex}
          src={currentItem.image}
          alt={currentItem.title}
          className="w-[310px] rounded-[20px] shadow-xl ring-4 ring-orange-100 animate-[zoomIn_.35s_ease]"
        />
      </div>
    </section>
  );
}

export default MangoIntroSection;
