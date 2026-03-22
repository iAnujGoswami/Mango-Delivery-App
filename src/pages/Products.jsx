import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { fetchProducts } from "../lib/api";

const INITIAL_COUNT = 12;
const PAGE_SIZE = 8;

function ProductCard({ item }) {
  return (
    <Link
      to={`/products/${item.id}`}
      className="group block rounded-2xl border border-[#ffd8a8] bg-[#fff7e8] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#ffb25b] hover:shadow-xl"
    >
      <img
        src={item.image}
        alt={item.name}
        className="h-96 w-full rounded-xl bg-[#fffaf0] object-contain transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <h3 className="mt-5 text-2xl font-semibold text-[#ff6f00]">{item.name}</h3>
      <p className="mt-2 text-lg text-[#6b5b45]">Fresh delivery in 10 minutes</p>
      <p className="mt-5 text-xl font-bold">Rs. {item.price}</p>
    </Link>
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const loadMoreRef = useRef(null);

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchProducts();
        if (!isMounted) return;
        setProducts(data);
      } catch {
        if (!isMounted) return;
        setError("Unable to load products right now.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

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
  }, [hasMore, products.length]);

  return (
    <div className="min-h-screen bg-[#fff1cc] text-[#213547]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pb-10 pt-3">
        <h1 className="mb-5 text-3xl font-semibold text-[#ff6f00]">Products</h1>

        {loading ? (
          <section className="rounded-3xl border border-[#ffd8a8] bg-[#fff7e8] p-8 text-center text-[#8b6b47]">
            Loading products...
          </section>
        ) : null}

        {error ? (
          <section className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
            {error}
          </section>
        ) : null}

        {!loading && !error && products.length > 0 ? (
          <>
            <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {visibleProducts.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </section>

            <div ref={loadMoreRef} className="py-8 text-center text-sm text-[#8b6b47]">
              {hasMore
                ? "Loading more products..."
                : `Showing all ${products.length} product${products.length === 1 ? "" : "s"}`}
            </div>
          </>
        ) : null}

        {!loading && !error && products.length === 0 ? (
          <section className="rounded-3xl border border-[#ffd8a8] bg-[#fff7e8] p-8 text-center text-[#8b6b47]">
            No products are available yet.
          </section>
        ) : null}
      </main>
    </div>
  );
}

export default Products;
