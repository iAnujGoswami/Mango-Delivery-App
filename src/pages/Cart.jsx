import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

function CartItemCard({ item, onIncreaseItem, onDecreaseItem, onDeleteItem }) {
  return (
    <article className="rounded-2xl border border-[#ffd8a8] bg-[#fff7e8] p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="h-24 w-24 rounded-xl bg-[#fffaf0] object-contain"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-[#ff6f00]">{item.name}</h3>
          <p className="text-[#6b5b45]">Rs. {item.price}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-[#7a4a12]">Qty: {item.quantity}</p>
          <p className="text-lg font-bold text-[#213547]">Rs. {item.price * item.quantity}</p>
          <div className="mt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => onDecreaseItem(item.id)}
              className="h-8 w-8 rounded-md bg-[#ffd6a0] text-lg font-bold text-[#7a4a12] hover:bg-[#ffc27a]"
            >
              -
            </button>
            <button
              type="button"
              onClick={() => onIncreaseItem(item.id)}
              className="h-8 w-8 rounded-md bg-orange-500 text-lg font-bold text-white hover:bg-orange-600"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => onDeleteItem(item.id)}
              className="rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-600"
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

  return (
    <div className="min-h-screen bg-[#fff1cc] text-[#213547]">
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 pb-10 pt-3">
        <h1 className="mb-5 text-3xl font-semibold text-[#ff6f00]">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="rounded-2xl border border-[#ffd8a8] bg-[#fff7e8] p-8 text-center text-[#8b6b47]">
            No items in cart. Add products to see them here.
          </div>
        ) : (
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

            <div className="mt-2 rounded-2xl border border-[#ffcf90] bg-white p-5 text-right">
              <p className="text-xl font-bold text-[#213547]">Total: Rs. {totalAmount}</p>
              <Link
                to="/checkout"
                className="mt-4 inline-block rounded-lg bg-[#ff8a00] px-4 py-2.5 font-semibold text-white transition hover:bg-[#f17f00]"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Cart;

