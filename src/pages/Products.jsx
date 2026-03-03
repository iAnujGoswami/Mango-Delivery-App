import { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import products from "../data";

const INITIAL_COUNT = 12;
const PAGE_SIZE = 8;

function ProductCard({ item, onAddToCart }) {
  return (
    <article className="group rounded-2xl border border-[#ffd8a8] bg-[#fff7e8] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#ffb25b]">
      <img
        src={item.image}
        alt={item.name}
        className="h-96 w-full rounded-xl bg-[#fffaf0] object-contain transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <h3 className="mt-5 text-2xl font-semibold text-[#ff6f00]">{item.name}</h3>
      <p className="mt-2 text-lg text-[#6b5b45]">Fresh delivery in 10 minutes</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xl font-bold">Rs. {item.price}</span>
        <button
          type="button"
          onClick={() => onAddToCart(item)}
          className="rounded-lg bg-orange-500 px-4 py-2 text-base font-semibold text-white transition hover:bg-orange-600"
        >
          Add
        </button>
      </div>
    </article>
  );
}

function Products({ onAddToCart = () => {} }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const loadMoreRef = useRef(null);

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, products.length));
      },
      { rootMargin: "220px 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <div className="min-h-screen bg-[#fff1cc] text-[#213547]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pb-10 pt-3">
        <h1 className="mb-5 text-3xl font-semibold text-[#ff6f00]">Products</h1>

        <section className="grid grid-cols-4 gap-5">
          {visibleProducts.map((item) => (
            <ProductCard key={item.id} item={item} onAddToCart={onAddToCart} />
          ))}
        </section>

        <div ref={loadMoreRef} className="py-8 text-center text-sm text-[#8b6b47]">
          {hasMore ? "Loading more products..." : "Showing all 80 products"}
        </div>
      </main>
    </div>
  );
}

export default Products;
