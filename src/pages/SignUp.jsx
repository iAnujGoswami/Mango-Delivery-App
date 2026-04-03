import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    fullName: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Placeholder submit action until backend signup is connected.
    console.log("Signup form submitted:", form);
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fffdf7_0%,#fff4de_36%,#ffe4b2_100%)]">
      <Navbar />
      <main className="mx-auto flex max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:min-h-[calc(100vh-88px)] lg:py-10">
        <section className="w-full max-w-3xl rounded-[36px] border border-[#ffd7a8] bg-[linear-gradient(180deg,#fffefb_0%,#fff6e8_100%)] p-6 shadow-[0_24px_70px_rgba(128,77,10,0.14)] sm:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ab6418]">Create account</p>
          <h1 className="mt-3 text-3xl text-[#8a4700] tenor-sans sm:text-4xl">Join Mango Delivery</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6a4a2a] sm:text-base">
            Create your account to order faster, save delivery details, and manage your fruit deliveries in one place.
          </p>

          <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold uppercase tracking-[0.08em] text-[#5e3f1f]">
                Username
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Enter username"
                className="mt-2 w-full rounded-2xl border border-[#ffcf90] bg-white px-4 py-3 text-[#213547] caret-[#213547] placeholder:text-[#9a7a57] outline-none transition focus:border-[#ff9f3a] focus:ring-4 focus:ring-[#ffe0b8]"
              />
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold uppercase tracking-[0.08em] text-[#5e3f1f]">
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
                className="mt-2 w-full rounded-2xl border border-[#ffcf90] bg-white px-4 py-3 text-[#213547] caret-[#213547] placeholder:text-[#9a7a57] outline-none transition focus:border-[#ff9f3a] focus:ring-4 focus:ring-[#ffe0b8]"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold uppercase tracking-[0.08em] text-[#5e3f1f]">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className="mt-2 w-full rounded-2xl border border-[#ffcf90] bg-white px-4 py-3 text-[#213547] caret-[#213547] placeholder:text-[#9a7a57] outline-none transition focus:border-[#ff9f3a] focus:ring-4 focus:ring-[#ffe0b8]"
              />
            </div>

            <div>
              <label htmlFor="dob" className="block text-sm font-semibold uppercase tracking-[0.08em] text-[#5e3f1f]">
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                required
                value={form.dob}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[#ffcf90] bg-white px-4 py-3 text-[#213547] caret-[#213547] outline-none transition focus:border-[#ff9f3a] focus:ring-4 focus:ring-[#ffe0b8]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold uppercase tracking-[0.08em] text-[#5e3f1f]">
                Password
              </label>
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

            <div className="sm:col-span-2">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold uppercase tracking-[0.08em] text-[#5e3f1f]">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="mt-2 w-full rounded-2xl border border-[#ffcf90] bg-white px-4 py-3 text-[#213547] caret-[#213547] placeholder:text-[#9a7a57] outline-none transition focus:border-[#ff9f3a] focus:ring-4 focus:ring-[#ffe0b8]"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full rounded-2xl bg-[#ff8a00] px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_16px_34px_rgba(255,138,0,0.25)] transition hover:bg-[#f17f00]"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-6 rounded-2xl border border-[#ffe0b8] bg-[#fff8ee] px-4 py-4 text-sm text-[#6a4a2a]">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#ff6f00] hover:underline">
              Sign in
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
