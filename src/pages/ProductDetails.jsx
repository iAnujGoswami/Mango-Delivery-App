import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { fetchProduct } from "../lib/api";

function ProductDetails({ cartItems = [], onAddToCart, onIncreaseItem }) {
  const { productId } = useParams();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchProduct(productId);
        if (!isMounted) return;
        setProduct(data);
      } catch {
        if (!isMounted) return;
        setError("Product not found or unavailable.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  useEffect(() => {
    setSelectedQuantity(1);
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff1cc] text-[#213547]">
        <Navbar />
        <main className="mx-auto max-w-5xl px-6 pb-10 pt-5">
          <div className="rounded-2xl border border-[#ffd8a8] bg-[#fff7e8] p-8 text-center text-[#8b6b47]">
            Loading product...
          </div>
        </main>
      </div>
    );
  }

  if (!product || error) {
    return (
      <div className="min-h-screen bg-[#fff1cc] text-[#213547]">
        <Navbar />
        <main className="mx-auto max-w-5xl px-6 pb-10 pt-5">
          <div className="rounded-2xl border border-[#ffd8a8] bg-[#fff7e8] p-8 text-center">
            <h1 className="text-2xl font-semibold text-[#ff6f00]">Product not found</h1>
            <p className="mt-2 text-[#6b5b45]">{error || "The selected product is not available."}</p>
            <Link
              to="/products"
              className="mt-5 inline-block rounded-lg bg-[#ff8a00] px-4 py-2.5 font-semibold text-white transition hover:bg-[#f17f00]"
            >
              Back to Products
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const cartQuantity = cartItems.find((item) => item.id === product.id)?.quantity || 0;

  function handleIncreaseSelected() {
    setSelectedQuantity((prev) => prev + 1);
  }

  function handleDecreaseSelected() {
    setSelectedQuantity((prev) => Math.max(1, prev - 1));
  }

  function handleAddToCartClick() {
    if (product.stock === 0) {
      return;
    }

    if (cartQuantity === 0) {
      onAddToCart(product);
      for (let i = 1; i < selectedQuantity; i += 1) {
        onIncreaseItem(product.id);
      }
      return;
    }

    for (let i = 0; i < selectedQuantity; i += 1) {
      onIncreaseItem(product.id);
    }
  }

  function handleImageError(event) {
    if (event.currentTarget.dataset.fallbackApplied === "true") return;

    event.currentTarget.dataset.fallbackApplied = "true";
    event.currentTarget.src = product.fallbackImage;
  }

  return (
    <div className="min-h-screen bg-[#fff1cc] text-[#213547]">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-10 pt-4">
        <Link to="/products" className="text-sm font-semibold text-[#a75700] hover:underline">
          &larr; Back to Products
        </Link>

        <section className="mt-3 grid gap-6 rounded-3xl border border-[#ffd8a8] bg-[#fff7e8] p-6 shadow-sm md:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl bg-[#fffaf0] p-4">
            <img
              src={product.image}
              alt={product.name}
              onError={handleImageError}
              className="h-[420px] w-full rounded-xl object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-semibold text-[#ff6f00] tenor-sans">{product.name}</h1>
            <p className="mt-2 text-lg text-[#6b5b45]">Fresh delivery in 10 minutes</p>
            <p className="mt-4 text-3xl font-bold text-[#2f2517]">Rs. {product.price}</p>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#5f4a34]">{product.description}</p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#8b6b47]">
              Category: {product.category}
            </p>
            <p className="mt-2 text-sm text-[#8b6b47]">
              {product.stock > 0 ? `${product.stock} in stock` : "Currently out of stock"}
            </p>

            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#8b6b47]">
                Quantity
              </p>
              <div className="inline-flex items-center gap-3 rounded-xl border border-[#ffcf90] bg-white px-3 py-2">
                <button
                  type="button"
                  onClick={handleDecreaseSelected}
                  className="h-9 w-9 rounded-lg bg-[#ffd6a0] text-lg font-bold text-[#7a4a12] transition hover:bg-[#ffc27a]"
                >
                  -
                </button>
                <span className="min-w-8 text-center text-lg font-semibold text-[#7a4a12]">
                  {selectedQuantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncreaseSelected}
                  className="h-9 w-9 rounded-lg bg-orange-500 text-lg font-bold text-white transition hover:bg-orange-600"
                >
                  +
                </button>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleAddToCartClick}
                  disabled={product.stock === 0}
                  className="rounded-xl bg-[#ff8a00] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#f17f00] disabled:cursor-not-allowed disabled:bg-[#ffcc94]"
                >
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>

              {cartQuantity > 0 ? (
                <p className="mt-3 text-sm font-semibold text-[#8a4700]">
                  Total Products in cart: {cartQuantity}
                </p>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductDetails;
