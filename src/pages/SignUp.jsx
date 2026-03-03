import { useState } from "react";
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
    <div className="min-h-screen bg-[#fff7e8]">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-[#ffd6a0] bg-white p-6 shadow-md">
          <h1 className="text-3xl font-bold text-[#ff6f00]">Create Account</h1>
          <p className="mt-2 text-[#6a4a2a]">Signup to start ordering fresh fruits.</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[#5e3f1f]">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Enter username"
                className="mt-1 w-full rounded-lg border border-[#ffcf90] bg-white px-3 py-2 text-[#213547] caret-[#213547] placeholder:text-[#8b6b47] outline-none focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
              />
            </div>

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
                className="mt-1 w-full rounded-lg border border-[#ffcf90] bg-white px-3 py-2 text-[#213547] caret-[#213547] placeholder:text-[#8b6b47] outline-none focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#5e3f1f]">
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
                className="mt-1 w-full rounded-lg border border-[#ffcf90] bg-white px-3 py-2 text-[#213547] caret-[#213547] placeholder:text-[#8b6b47] outline-none focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
              />
            </div>

            <div>
              <label htmlFor="dob" className="block text-sm font-semibold text-[#5e3f1f]">
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                required
                value={form.dob}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-[#ffcf90] bg-white px-3 py-2 text-[#213547] caret-[#213547] outline-none focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#5e3f1f]">
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
                className="mt-1 w-full rounded-lg border border-[#ffcf90] bg-white px-3 py-2 text-[#213547] caret-[#213547] placeholder:text-[#8b6b47] outline-none focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#ff8a00] px-4 py-2.5 font-semibold text-white transition hover:bg-[#f17f00]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
