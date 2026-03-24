import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

function CartItemCard({ item, onIncreaseItem, onDecreaseItem, onDeleteItem }) {
  function handleImageError(event) {
    if (event.currentTarget.dataset.fallbackApplied === "true") return;

    event.currentTarget.dataset.fallbackApplied = "true";
    event.currentTarget.src = item.fallbackImage || "/Logo.jpg";
  }

  return (
    <article className="rounded-3xl border border-[#ffd8a8] bg-[#fff9f0] p-4 shadow-[0_10px_28px_rgba(120,70,11,0.08)] sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <img
          src={item.image}
          alt={item.name}
          onError={handleImageError}
          className="h-24 w-24 rounded-2xl border border-[#ffe1b7] bg-[#fffaf0] object-contain"
        />
        <div className="flex-1 min-w-0">
          <h3 className="truncate text-xl font-semibold text-[#ff6f00]">{item.name}</h3>
          <p className="text-sm font-medium text-[#8b6b47]">Rs. {item.price} each</p>
        </div>
        <div className="sm:text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#8b6b47]">
            Qty: {item.quantity}
          </p>
          <p className="text-xl font-bold text-[#2f2517]">Rs. {item.price * item.quantity}</p>
          <div className="mt-2 flex items-center gap-2 sm:justify-end">
            <button
              type="button"
              onClick={() => onDecreaseItem(item.id)}
              className="h-9 w-9 rounded-lg bg-[#ffd6a0] text-lg font-bold text-[#7a4a12] transition hover:bg-[#ffc27a]"
            >
              -
            </button>
            <button
              type="button"
              onClick={() => onIncreaseItem(item.id)}
              className="h-9 w-9 rounded-lg bg-orange-500 text-lg font-bold text-white transition hover:bg-orange-600"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => onDeleteItem(item.id)}
              className="rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function Cart({ cartItems = [], onIncreaseItem, onDecreaseItem, onDeleteItem }) {
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff5df] via-[#fff0d1] to-[#ffe7bf] text-[#213547]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-12 pt-4 sm:px-6">
        <section className="rounded-[30px] border border-[#ffd8a8] bg-gradient-to-br from-[#fff9ee] to-[#ffe7bd] p-6 shadow-[0_16px_45px_rgba(145,77,8,0.12)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a75700]">Shopping Cart</p>
          <h1 className="mt-2 text-3xl tenor-sans text-[#8a4700] sm:text-4xl">Review Your Order</h1>
          <p className="mt-2 text-sm text-[#6a4b2b] sm:text-base">
            {totalItems} item{totalItems === 1 ? "" : "s"} ready for checkout.
          </p>
        </section>

        {cartItems.length === 0 ? (
          <section className="mt-6 rounded-3xl border border-[#ffd8a8] bg-[#fff9f0] p-8 text-center text-[#8b6b47] shadow-sm">
            <p className="text-lg font-semibold text-[#8a4700]">Your cart is empty</p>
            <p className="mt-2">Add products to see them here.</p>
            <Link
              to="/products"
              className="mt-5 inline-block rounded-xl bg-[#ff8a00] px-5 py-2.5 font-semibold text-white transition hover:bg-[#f17f00]"
            >
              Browse Products
            </Link>
          </section>
        ) : (
          <section className="mt-6 grid gap-5 lg:grid-cols-[1.45fr_0.9fr]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onIncreaseItem={onIncreaseItem}
                  onDecreaseItem={onDecreaseItem}
                  onDeleteItem={onDeleteItem}
                />
              ))}
            </div>

            <aside className="h-fit rounded-3xl border border-[#ffd8a8] bg-[#fffdf8] p-5 shadow-[0_10px_30px_rgba(120,70,11,0.08)] lg:sticky lg:top-24">
              <h2 className="text-xl font-semibold text-[#8a4700]">Order Summary</h2>
              <div className="mt-4 space-y-2 text-sm text-[#6b5b45]">
                <div className="flex items-center justify-between">
                  <span>Items</span>
                  <span className="font-semibold">{totalItems}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">Rs. {totalAmount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery</span>
                  <span className="font-semibold text-green-700">Free</span>
                </div>
              </div>

              <div className="mt-4 border-t border-[#ffe1b7] pt-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#8b6b47]">Total</p>
                  <p className="text-2xl font-bold text-[#213547]">Rs. {totalAmount}</p>
                </div>
                <p className="mt-1 text-xs text-[#8b6b47]">Inclusive of all taxes</p>
              </div>

              <Link
                to="/checkout"
                className="mt-5 block rounded-xl bg-[#ff8a00] px-4 py-3 text-center font-semibold text-white transition hover:bg-[#f17f00]"
              >
                Proceed to Checkout
              </Link>
            </aside>
          </section>
        )}
      </main>
    </div>
  );
}

export default Cart;
