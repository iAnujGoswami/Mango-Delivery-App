
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
    <div className="min-h-screen bg-[#fff7e8]">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-[#ffd6a0] bg-white p-6 shadow-md">
          <h1 className="text-3xl font-bold text-[#ff6f00]">Login</h1>
          <p className="mt-2 text-[#6a4a2a]">Welcome back to Mango Delivery.</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="identity" className="block text-sm font-semibold text-[#5e3f1f]">
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
                className="mt-1 w-full rounded-lg border border-[#ffcf90] bg-white px-3 py-2 text-[#213547] caret-[#213547] placeholder:text-[#8b6b47] outline-none focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#5e3f1f]">
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
                className="mt-1 w-full rounded-lg border border-[#ffcf90] bg-white px-3 py-2 text-[#213547] caret-[#213547] placeholder:text-[#8b6b47] outline-none focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#ff8a00] px-4 py-2.5 font-semibold text-white transition hover:bg-[#f17f00]"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-[#6a4a2a]">
            New to Mango Delivery?{" "}
            <Link to="/signup" className="font-semibold text-[#ff6f00] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
