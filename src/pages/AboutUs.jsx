import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

const STATS = [
  { label: "Orders Delivered", value: "1.2M+" },
  { label: "Partner Farms", value: "350+" },
  { label: "Cities Served", value: "42" },
  { label: "On-time Delivery", value: "98.7%" },
];

const VALUES = [
  {
    title: "Farm First",
    description:
      "We source directly from trusted growers and pay fair prices so quality and livelihoods both improve.",
  },
  {
    title: "Fast and Fresh",
    description:
      "Cold-chain handling, smart routing, and local hubs help us deliver naturally fresh produce quickly.",
  },
  {
    title: "Quality You Can Trust",
    description:
      "Every batch is checked for ripeness, appearance, and consistency before it reaches your doorstep.",
  },
];

function AboutUs() {
  return (
    <div className="min-h-screen bg-[#fff1cc] text-[#2f2517]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pb-14 pt-4">
        <section className="relative overflow-hidden rounded-[32px] border border-[#ffd8a8] bg-gradient-to-br from-[#fff7e8] via-[#fff1db] to-[#ffe2b8] p-8 shadow-[0_24px_50px_rgba(145,77,8,0.12)] md:p-12 animate-[fadeIn_.35s_ease]">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#ffb25b]/35 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#ffd595]/35 blur-3xl" />

          <div className="relative grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b26000]">
                About Mango Delivery
              </p>
              <h1 className="mt-3 text-4xl leading-tight text-[#6f3500] tenor-sans md:text-6xl">
                Bringing orchard-fresh fruits to your doorstep, faster and better.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-[#664729]">
                Mango Delivery started with one goal: make premium fruits easy to buy without the
                guesswork. From careful sourcing to final-mile delivery, we focus on freshness,
                consistency, and service your family can rely on every day.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="rounded-full bg-[#ff7a00] px-6 py-3 font-semibold text-white transition hover:bg-[#e76900]"
                >
                  Explore Products
                </Link>
                <Link
                  to="/login"
                  className="rounded-full border border-[#ffb25b] bg-[#fff7e8] px-6 py-3 font-semibold text-[#8a4700] transition hover:bg-[#ffe7bf]"
                >
                  Join Mango Delivery
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-[#ffc67f] bg-[#fffaf0]/85 p-6 shadow-md md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a75700]">
                Our Promise
              </p>
              <p className="mt-3 text-2xl leading-snug text-[#7a4207] tenor-sans">
                Better produce, transparent sourcing, and dependable deliveries.
              </p>
              <p className="mt-4 text-[#6b4a28]">
                We keep our standards simple: if we would not serve it at home, we will not send
                it to you.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((item) => (
            <article
              key={item.label}
              className="rounded-2xl border border-[#ffd8a8] bg-[#fff7e8] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-3xl font-bold text-[#ff6f00]">{item.value}</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em] text-[#7a5b35]">
                {item.label}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {VALUES.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[#ffd8a8] bg-white/80 p-6 shadow-sm"
            >
              <h2 className="text-2xl text-[#8a4700] tenor-sans">{item.title}</h2>
              <p className="mt-3 text-[#6a4b2b]">{item.description}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default AboutUs;
