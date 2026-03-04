import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

function Checkout({ cartItems = [] }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
  });

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const orderPayload = {
      address: {
        fullName: form.fullName,
        phone: form.phone,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
      },
      paymentMethod: form.paymentMethod,
      items: cartItems,
      totalAmount,
    };

    // Placeholder submit action until backend order API is connected.
    console.log("Place order payload:", orderPayload);
    alert("Order placed successfully.");
    navigate("/");
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#fff1cc] text-[#213547]">
        <Navbar />
        <main className="mx-auto max-w-3xl px-6 pb-10 pt-6">
          <h1 className="text-3xl font-semibold text-[#ff6f00]">Checkout</h1>
          <div className="mt-5 rounded-2xl border border-[#ffd8a8] bg-[#fff7e8] p-8 text-center text-[#8b6b47]">
            Your cart is empty. Add products before checkout.
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff5df] via-[#fff0d1] to-[#ffe7bf] text-[#2c2418]">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-12 pt-4 sm:px-6">
        <section className="relative overflow-hidden rounded-[30px] border border-[#ffd8a8] bg-gradient-to-br from-[#fff9ee] to-[#ffe7bd] p-6 shadow-[0_16px_45px_rgba(145,77,8,0.12)] sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#ffc67f]/35 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 bottom-0 h-44 w-44 rounded-full bg-[#ffd8a8]/45 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a75700]">Secure Checkout</p>
            <h1 className="mt-2 text-3xl text-[#8a4700] tenor-sans sm:text-4xl">Complete Your Order</h1>
            <p className="mt-2 text-sm text-[#6a4b2b] sm:text-base">
              Enter your delivery details, choose a payment method, and place your order in one step.
            </p>
          </div>
        </section>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[#ffd8a8] bg-[#fff9f0]/95 p-6 shadow-[0_10px_30px_rgba(120,70,11,0.08)]"
          >
            <h2 className="text-xl font-semibold text-[#8a4700]">Delivery Address</h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-[#5e3f1f]">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="mt-1 w-full rounded-xl border border-[#ffcf90] bg-white px-3 py-2.5 text-[#2f2517] placeholder:text-[#9c7a54] outline-none transition focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-[#5e3f1f]">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className="mt-1 w-full rounded-xl border border-[#ffcf90] bg-white px-3 py-2.5 text-[#2f2517] placeholder:text-[#9c7a54] outline-none transition focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="addressLine1" className="block text-sm font-semibold text-[#5e3f1f]">
                Address Line 1
              </label>
              <input
                id="addressLine1"
                name="addressLine1"
                type="text"
                required
                value={form.addressLine1}
                onChange={handleChange}
                placeholder="House no, street, area"
                className="mt-1 w-full rounded-xl border border-[#ffcf90] bg-white px-3 py-2.5 text-[#2f2517] placeholder:text-[#9c7a54] outline-none transition focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="addressLine2" className="block text-sm font-semibold text-[#5e3f1f]">
                Address Line 2 (Optional)
              </label>
              <input
                id="addressLine2"
                name="addressLine2"
                type="text"
                value={form.addressLine2}
                onChange={handleChange}
                placeholder="Landmark, apartment, etc."
                className="mt-1 w-full rounded-xl border border-[#ffcf90] bg-white px-3 py-2.5 text-[#2f2517] placeholder:text-[#9c7a54] outline-none transition focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
              />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-[#5e3f1f]">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="mt-1 w-full rounded-xl border border-[#ffcf90] bg-white px-3 py-2.5 text-[#2f2517] placeholder:text-[#9c7a54] outline-none transition focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-semibold text-[#5e3f1f]">
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  required
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="mt-1 w-full rounded-xl border border-[#ffcf90] bg-white px-3 py-2.5 text-[#2f2517] placeholder:text-[#9c7a54] outline-none transition focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
                />
              </div>

              <div>
                <label htmlFor="pincode" className="block text-sm font-semibold text-[#5e3f1f]">
                  Pincode
                </label>
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  required
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="6-digit pincode"
                  className="mt-1 w-full rounded-xl border border-[#ffcf90] bg-white px-3 py-2.5 text-[#2f2517] placeholder:text-[#9c7a54] outline-none transition focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
                />
              </div>
            </div>

            <h2 className="mt-6 text-xl font-semibold text-[#8a4700]">Payment Method</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <label
                className={`cursor-pointer rounded-2xl border p-3 text-sm font-semibold transition ${
                  form.paymentMethod === "cod"
                    ? "border-[#ff9f3a] bg-[#fff1d6] text-[#8a4700] shadow-sm"
                    : "border-[#ffcf90] bg-white text-[#6a4a2a] hover:bg-[#fff7e8]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={form.paymentMethod === "cod"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Cash on Delivery
              </label>
              <label
                className={`cursor-pointer rounded-2xl border p-3 text-sm font-semibold transition ${
                  form.paymentMethod === "upi"
                    ? "border-[#ff9f3a] bg-[#fff1d6] text-[#8a4700] shadow-sm"
                    : "border-[#ffcf90] bg-white text-[#6a4a2a] hover:bg-[#fff7e8]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={form.paymentMethod === "upi"}
                  onChange={handleChange}
                  className="mr-2"
                />
                UPI
              </label>
              <label
                className={`cursor-pointer rounded-2xl border p-3 text-sm font-semibold transition ${
                  form.paymentMethod === "card"
                    ? "border-[#ff9f3a] bg-[#fff1d6] text-[#8a4700] shadow-sm"
                    : "border-[#ffcf90] bg-white text-[#6a4a2a] hover:bg-[#fff7e8]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={form.paymentMethod === "card"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Card
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-[#ff8a00] px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-[#f17f00] active:scale-[0.99]"
            >
              Place Order
            </button>
          </form>

          <aside className="h-fit rounded-3xl border border-[#ffd8a8] bg-[#fffdf8] p-5 shadow-[0_10px_30px_rgba(120,70,11,0.08)]">
            <h2 className="text-xl font-semibold text-[#8a4700]">Order Summary</h2>
            <div className="mt-3 space-y-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg bg-[#fff7e8] px-3 py-2 text-sm text-[#6b5b45]"
                >
                  <span className="max-w-[70%] truncate">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-semibold text-[#5a432a]">Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-[#ffe1b7] pt-3 text-right">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#8b6b47]">Payable Amount</p>
              <p className="text-2xl font-bold text-[#213547]">Rs. {totalAmount}</p>
              <p className="mt-1 text-xs text-[#8b6b47]">Inclusive of all taxes</p>
            </div>

            <div className="mt-4 rounded-xl border border-[#ffcf90] bg-[#fff7e8] p-3 text-xs text-[#7a5b35]">
              Your order details will be securely shared with our delivery partner after confirmation.
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
