import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function Login() {
  const [form, setForm] = useState({ identity: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Placeholder submit action until backend auth is connected.
    console.log("Login form submitted:", form);
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fffdf7_0%,#fff4de_36%,#ffe4b2_100%)]">
      <Navbar />
      <main className="mx-auto flex max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:min-h-[calc(100vh-88px)] lg:py-10">
        <section className="w-full max-w-xl rounded-[36px] border border-[#ffd7a8] bg-[linear-gradient(180deg,#fffefb_0%,#fff6e8_100%)] p-6 shadow-[0_24px_70px_rgba(128,77,10,0.14)] sm:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ab6418]">Welcome back</p>
          <h1 className="mt-3 text-3xl text-[#8a4700] tenor-sans sm:text-4xl">Sign in to Mango Delivery</h1>
          <p className="mt-3 text-sm leading-7 text-[#6a4a2a] sm:text-base">
            Access your account to manage orders, saved addresses, and faster checkout.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="identity" className="block text-sm font-semibold uppercase tracking-[0.08em] text-[#5e3f1f]">
                Username or Email
              </label>
              <input
                id="identity"
                name="identity"
                type="text"
                required
                value={form.identity}
                onChange={handleChange}
                placeholder="Enter username or email"
                className="mt-2 w-full rounded-2xl border border-[#ffcf90] bg-white px-4 py-3 text-[#213547] caret-[#213547] placeholder:text-[#9a7a57] outline-none transition focus:border-[#ff9f3a] focus:ring-4 focus:ring-[#ffe0b8]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="password" className="block text-sm font-semibold uppercase tracking-[0.08em] text-[#5e3f1f]">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-semibold uppercase tracking-[0.08em] text-[#c56c0d] transition hover:text-[#8a4700]"
                >
                  Forgot?
                </button>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="mt-2 w-full rounded-2xl border border-[#ffcf90] bg-white px-4 py-3 text-[#213547] caret-[#213547] placeholder:text-[#9a7a57] outline-none transition focus:border-[#ff9f3a] focus:ring-4 focus:ring-[#ffe0b8]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#ff8a00] px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_16px_34px_rgba(255,138,0,0.25)] transition hover:bg-[#f17f00]"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-[#ffe0b8] bg-[#fff8ee] px-4 py-4 text-sm text-[#6a4a2a]">
            New to Mango Delivery?{" "}
            <Link to="/signup" className="font-semibold text-[#ff6f00] hover:underline">
              Create an account
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
