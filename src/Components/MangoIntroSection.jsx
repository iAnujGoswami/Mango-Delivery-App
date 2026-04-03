import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { INTRO_DATA } from "../data";
import { FALLBACK_PRODUCT_IMAGE } from "../lib/products";

function MangoIntroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const benefitCards = [
    {
      title: "Premium sourcing",
      description: "We partner with trusted farms and select fruit batches for flavor, freshness, and shelf life.",
    },
    {
      title: "Fast fulfillment",
      description: "Orders are packed locally and dispatched quickly so your produce arrives ready to use.",
    },
    {
      title: "Reliable quality",
      description: "Each order is checked before dispatch to reduce bruising, underripe fruit, and damaged packs.",
    },
  ];
  const serviceMetrics = [
    { value: "10m", label: "Average delivery" },
    { value: "4+", label: "Active cities" },
    { value: "100%", label: "Freshness focus" },
  ];
  const experienceHighlights = ["Handpicked fruit", "Daily replenishment", "Clean packaging"];
  const cities = ["Chatrapati Sambhajinagar", "Pune", "Mumbai", "Bangalore"];

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
    <section className="relative mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6">
      <div className="relative overflow-hidden rounded-[38px] border border-[#ffd7a6] bg-[linear-gradient(135deg,#fff9ef_0%,#fff0d1_42%,#ffd798_100%)] p-6 shadow-[0_24px_70px_rgba(132,74,7,0.16)] md:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),transparent_70%)]" />
        <div className="pointer-events-none absolute -right-16 top-8 h-72 w-72 rounded-full bg-[#ffb661]/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-[#ffd89f]/35 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div key={currentIndex} className="animate-[fadeIn_.35s_ease] space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <p className="inline-flex rounded-full border border-[#ffcf95] bg-white/75 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#a65a00]">
                Premium fruit delivery
              </p>
              <span className="rounded-full bg-[#8a4700] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#fff3dd]">
                10-minute promise
              </span>
            </div>

            <div className="max-w-2xl space-y-4">
              <h1 className="text-4xl leading-[1.02] text-[#7a3d00] tenor-sans sm:text-5xl lg:text-7xl">
                Fresh fruit,
                <span className="block text-[#df6800]">delivered like a premium grocery brand.</span>
              </h1>
              <p className="max-w-xl text-base leading-7 text-[#5f4a34] sm:text-lg">
                {currentItem.description}. Shop trusted seasonal picks, cleaner packaging, and a more reliable
                doorstep experience.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {experienceHighlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#ffd29f] bg-white/75 px-4 py-2 text-sm font-semibold text-[#7e4305]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="rounded-full bg-[#ff7a00] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_14px_30px_rgba(255,122,0,0.3)] transition hover:bg-[#e76900]"
              >
                Shop Collection
              </button>
              <button
                type="button"
                onClick={() => navigate("/about")}
                className="rounded-full border border-[#d79a56] bg-white/85 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-[#8a4700] transition hover:bg-[#fff1d7]"
              >
                Learn Our Story
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {serviceMetrics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[#ffd6a8] bg-white/70 px-4 py-4 shadow-sm"
                >
                  <p className="text-2xl font-bold text-[#8a4700] sm:text-3xl">{item.value}</p>
                  <p className="mt-1 text-sm font-medium text-[#6f573d]">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                aria-label="Previous"
                onClick={handlePrev}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e7b87a] bg-white/85 text-xl text-[#d26700] shadow-sm transition hover:bg-white"
              >
                &lsaquo;
              </button>
              <div className="flex items-center gap-2">
                {INTRO_DATA.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => handleDotClick(index)}
                    className={`h-2.5 rounded-full transition ${
                      index === currentIndex ? "w-10 bg-[#ff7a00]" : "w-2.5 bg-[#ffc989] hover:bg-[#ffb868]"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next"
                onClick={handleNext}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e7b87a] bg-white/85 text-xl text-[#d26700] shadow-sm transition hover:bg-white"
              >
                &rsaquo;
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:pl-6">
            <div className="rounded-[30px] border border-[#f2cb98] bg-[#fffaf2]/78 p-4 shadow-[0_18px_45px_rgba(125,72,10,0.12)]">
              <div className="flex items-center justify-between rounded-2xl border border-[#f7d9b2] bg-white/90 px-4 py-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ab6418]">Today&apos;s spotlight</p>
                  <p className="mt-1 text-xl text-[#8a4700] tenor-sans">{currentItem.title}</p>
                </div>
                <span className="rounded-full bg-[#fff0d6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#96520b]">
                  Seasonal
                </span>
              </div>

              <div className="mt-4 rounded-[26px] bg-[linear-gradient(180deg,#fff8ed_0%,#ffe9bf_100%)] p-3">
                <img
                  key={currentIndex}
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="h-[300px] w-full animate-[zoomIn_.35s_ease] rounded-[22px] object-cover shadow-[0_24px_40px_rgba(117,70,16,0.18)] sm:h-[360px]"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-[#ffd7a8] bg-[#8a4700] p-5 text-[#fff3dd] shadow-[0_16px_35px_rgba(103,58,7,0.18)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffcc86]">Operational window</p>
                <p className="mt-3 text-3xl tenor-sans">6 AM to 11 PM</p>
                <p className="mt-2 text-sm leading-6 text-[#ffe9c4]">
                  Morning restocks and fast local dispatch keep the catalogue fresher throughout the day.
                </p>
              </div>

              <div className="rounded-3xl border border-[#ffd7a8] bg-white/85 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ab6418]">Current focus</p>
                <p className="mt-3 text-2xl text-[#8a4700] tenor-sans">{currentItem.title}</p>
                <p className="mt-2 text-sm leading-6 text-[#644b31]">
                  Rotating hero stories help customers discover fresh picks without scrolling through the full catalogue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[32px] border border-[#ffdcb0] bg-[#fff9ef]/95 p-5 shadow-[0_14px_35px_rgba(127,77,10,0.08)] md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ad630e]">Customer favorites</p>
              <h2 className="mt-2 text-3xl text-[#8a4700] tenor-sans">Popular Picks</h2>
            </div>
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="rounded-full border border-[#ffb25b] bg-white px-4 py-2 text-sm font-semibold text-[#8a4700] transition hover:bg-[#ffe7bf]"
            >
              View All Products
            </button>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {previewProducts.map((item, index) => (
              <article
                key={item.id}
                className="group rounded-[26px] border border-[#ffe0b8] bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(136,83,11,0.12)]"
              >
                <div className="rounded-[22px] bg-[linear-gradient(180deg,#fffaf1_0%,#fff0d2_100%)] p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-28 w-full object-contain transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-[#8a4700]">{item.name}</h3>
                    <p className="mt-1 text-sm text-[#6f573d]">{item.price}</p>
                  </div>
                  <span className="rounded-full bg-[#fff2dd] px-3 py-1 text-xs font-semibold text-[#ab6418]">
                    0{index + 1}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-[#ffdcb0] bg-[linear-gradient(180deg,#fff6e6_0%,#ffedcd_100%)] p-5 shadow-[0_14px_35px_rgba(127,77,10,0.08)] md:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ad630e]">Why customers stay</p>
          <h2 className="mt-2 text-3xl text-[#8a4700] tenor-sans">A cleaner, more dependable fruit experience</h2>

          <div className="mt-5 space-y-4">
            {benefitCards.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-[#ffddb5] bg-white/85 p-4 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-[#8a4700]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#624a31]">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-[34px] border border-[#ffdcb0] bg-[linear-gradient(135deg,#8a4700_0%,#b85f00_52%,#d97500_100%)] p-6 text-[#fff6e7] shadow-[0_18px_40px_rgba(111,63,6,0.2)] md:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffd18e]">Service coverage</p>
            <h2 className="mt-2 text-3xl tenor-sans sm:text-4xl">Fast delivery where people actually need it</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#ffe6bf] sm:text-base">
              Built for fast-moving urban households, with local operations designed around repeat orders and fresher inventory.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#8a4700] transition hover:bg-[#fff1d7]"
          >
            Start Shopping
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {cities.map((city) => (
            <span
              key={city}
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-[#fff1d9] backdrop-blur-sm"
            >
              {city}
            </span>
          ))}
        </div>
      </section>
    </section>
  );
}

export default MangoIntroSection;
