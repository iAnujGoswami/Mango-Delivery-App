import { useMemo, useState } from "react";
import Navbar from "../Components/Navbar";

const PROFILE_STORAGE_KEY = "mango_user_profile";
const ADDRESS_STORAGE_KEY = "mango_user_addresses";

const EMPTY_PROFILE = {
  fullName: "",
  email: "",
  phone: "",
};

const EMPTY_ADDRESS = {
  label: "Home",
  receiverName: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  isDefault: false,
};

function readLocalStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function Profile() {
  const [profile, setProfile] = useState(() => readLocalStorage(PROFILE_STORAGE_KEY, EMPTY_PROFILE));
  const [addresses, setAddresses] = useState(() => readLocalStorage(ADDRESS_STORAGE_KEY, []));
  const [addressForm, setAddressForm] = useState(EMPTY_ADDRESS);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [notice, setNotice] = useState("");

  const isEditing = useMemo(() => editingAddressId !== null, [editingAddressId]);

  function showNotice(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  }

  function handleProfileChange(e) {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }

  function handleSaveProfile(e) {
    e.preventDefault();
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    showNotice("Profile saved.");
  }

  function handleAddressChange(e) {
    const { name, value, type, checked } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function resetAddressForm() {
    setAddressForm(EMPTY_ADDRESS);
    setEditingAddressId(null);
  }

  function persistAddresses(nextAddresses) {
    setAddresses(nextAddresses);
    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(nextAddresses));
  }

  function normalizeDefaultAddress(nextAddresses, selectedId, selectedIsDefault) {
    if (!selectedIsDefault) {
      return nextAddresses;
    }

    return nextAddresses.map((item) => ({
      ...item,
      isDefault: item.id === selectedId,
    }));
  }

  function handleSaveAddress(e) {
    e.preventDefault();

    if (isEditing) {
      const updated = addresses.map((item) =>
        item.id === editingAddressId ? { ...item, ...addressForm, id: item.id } : item
      );
      const normalized = normalizeDefaultAddress(updated, editingAddressId, addressForm.isDefault);
      persistAddresses(normalized);
      resetAddressForm();
      showNotice("Address updated.");
      return;
    }

    const newId = `addr_${Date.now()}`;
    const next = [...addresses, { ...addressForm, id: newId }];
    const normalized = normalizeDefaultAddress(next, newId, addressForm.isDefault);
    persistAddresses(normalized);
    resetAddressForm();
    showNotice("Address saved.");
  }

  function handleEditAddress(addressId) {
    const selected = addresses.find((item) => item.id === addressId);
    if (!selected) return;
    setEditingAddressId(addressId);
    setAddressForm({
      label: selected.label || "Home",
      receiverName: selected.receiverName || "",
      phone: selected.phone || "",
      line1: selected.line1 || "",
      line2: selected.line2 || "",
      city: selected.city || "",
      state: selected.state || "",
      pincode: selected.pincode || "",
      isDefault: !!selected.isDefault,
    });
  }

  function handleDeleteAddress(addressId) {
    const next = addresses.filter((item) => item.id !== addressId);
    const hadDefault = addresses.find((item) => item.id === addressId)?.isDefault;

    if (hadDefault && next.length > 0) {
      next[0].isDefault = true;
    }

    persistAddresses(next);
    if (editingAddressId === addressId) {
      resetAddressForm();
    }
    showNotice("Address deleted.");
  }

  function handleSetDefault(addressId) {
    const next = addresses.map((item) => ({
      ...item,
      isDefault: item.id === addressId,
    }));
    persistAddresses(next);
    if (editingAddressId === addressId) {
      setAddressForm((prev) => ({ ...prev, isDefault: true }));
    }
    showNotice("Default address updated.");
  }

  return (
    <div className="min-h-screen bg-[#fff1cc] text-[#2f2517]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-12 pt-4 sm:px-6">
        <section className="rounded-[30px] border border-[#ffd8a8] bg-gradient-to-br from-[#fff9ee] to-[#ffe8c0] p-6 shadow-[0_16px_45px_rgba(145,77,8,0.12)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a75700]">My Account</p>
          <h1 className="mt-2 text-3xl tenor-sans text-[#8a4700] sm:text-4xl">Profile & Address Book</h1>
          <p className="mt-2 text-sm text-[#6a4b2b] sm:text-base">
            Manage your contact details and delivery addresses for faster checkout.
          </p>
          {notice && (
            <div className="mt-4 rounded-xl border border-[#ffcf90] bg-[#fff7e8] px-4 py-2 text-sm font-semibold text-[#8a4700]">
              {notice}
            </div>
          )}
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <section className="rounded-3xl border border-[#ffd8a8] bg-[#fff9f0] p-6 shadow-[0_10px_30px_rgba(120,70,11,0.08)]">
            <h2 className="text-2xl tenor-sans text-[#8a4700]">Basic Profile</h2>
            <form className="mt-4 space-y-4" onSubmit={handleSaveProfile}>
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-[#5e3f1f]">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={profile.fullName}
                  onChange={handleProfileChange}
                  placeholder="Enter full name"
                  className="mt-1 w-full rounded-xl border border-[#ffcf90] bg-white px-3 py-2.5 outline-none transition focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#5e3f1f]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={profile.email}
                  onChange={handleProfileChange}
                  placeholder="Enter email"
                  className="mt-1 w-full rounded-xl border border-[#ffcf90] bg-white px-3 py-2.5 outline-none transition focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
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
                  value={profile.phone}
                  onChange={handleProfileChange}
                  placeholder="Enter phone number"
                  className="mt-1 w-full rounded-xl border border-[#ffcf90] bg-white px-3 py-2.5 outline-none transition focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
                />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-[#ff8a00] px-5 py-2.5 font-semibold text-white transition hover:bg-[#f17f00]"
              >
                Save Profile
              </button>
            </form>
          </section>

          <section className="rounded-3xl border border-[#ffd8a8] bg-[#fff9f0] p-6 shadow-[0_10px_30px_rgba(120,70,11,0.08)]">
            <h2 className="text-2xl tenor-sans text-[#8a4700]">{isEditing ? "Edit Address" : "Add Address"}</h2>
            <form className="mt-4 space-y-4" onSubmit={handleSaveAddress}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="label" className="block text-sm font-semibold text-[#5e3f1f]">
                    Address Label
                  </label>
                  <select
                    id="label"
                    name="label"
                    value={addressForm.label}
                    onChange={handleAddressChange}
                    className="mt-1 w-full rounded-xl border border-[#ffcf90] bg-white px-3 py-2.5 outline-none transition focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="receiverName" className="block text-sm font-semibold text-[#5e3f1f]">
                    Receiver Name
                  </label>
                  <input
                    id="receiverName"
                    name="receiverName"
                    type="text"
                    required
                    value={addressForm.receiverName}
                    onChange={handleAddressChange}
                    placeholder="Receiver name"
                    className="mt-1 w-full rounded-xl border border-[#ffcf90] bg-white px-3 py-2.5 outline-none transition focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="addressPhone" className="block text-sm font-semibold text-[#5e3f1f]">
                  Phone Number
                </label>
                <input
                  id="addressPhone"
                  name="phone"
                  type="tel"
                  required
                  value={addressForm.phone}
                  onChange={handleAddressChange}
                  placeholder="Phone number"
                  className="mt-1 w-full rounded-xl border border-[#ffcf90] bg-white px-3 py-2.5 outline-none transition focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
                />
              </div>

              <div>
                <label htmlFor="line1" className="block text-sm font-semibold text-[#5e3f1f]">
                  Address Line 1
                </label>
                <input
                  id="line1"
                  name="line1"
                  type="text"
                  required
                  value={addressForm.line1}
                  onChange={handleAddressChange}
                  placeholder="House no, street, area"
                  className="mt-1 w-full rounded-xl border border-[#ffcf90] bg-white px-3 py-2.5 outline-none transition focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
                />
              </div>

              <div>
                <label htmlFor="line2" className="block text-sm font-semibold text-[#5e3f1f]">
                  Address Line 2 (Optional)
                </label>
                <input
                  id="line2"
                  name="line2"
                  type="text"
                  value={addressForm.line2}
                  onChange={handleAddressChange}
                  placeholder="Landmark, apartment"
                  className="mt-1 w-full rounded-xl border border-[#ffcf90] bg-white px-3 py-2.5 outline-none transition focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-[#5e3f1f]">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={addressForm.city}
                    onChange={handleAddressChange}
                    className="mt-1 w-full rounded-xl border border-[#ffcf90] bg-white px-3 py-2.5 outline-none transition focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
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
                    value={addressForm.state}
                    onChange={handleAddressChange}
                    className="mt-1 w-full rounded-xl border border-[#ffcf90] bg-white px-3 py-2.5 outline-none transition focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
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
                    value={addressForm.pincode}
                    onChange={handleAddressChange}
                    className="mt-1 w-full rounded-xl border border-[#ffcf90] bg-white px-3 py-2.5 outline-none transition focus:border-[#ff9f3a] focus:ring-2 focus:ring-[#ffd4a2]"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm font-semibold text-[#6a4a2a]">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={addressForm.isDefault}
                  onChange={handleAddressChange}
                  className="h-4 w-4 accent-[#ff8a00]"
                />
                Set as default address
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-xl bg-[#ff8a00] px-5 py-2.5 font-semibold text-white transition hover:bg-[#f17f00]"
                >
                  {isEditing ? "Update Address" : "Save Address"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetAddressForm}
                    className="rounded-xl border border-[#ffb25b] bg-white px-5 py-2.5 font-semibold text-[#8a4700] transition hover:bg-[#ffe8c2]"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </section>
        </div>

        <section className="mt-6 rounded-3xl border border-[#ffd8a8] bg-[#fff9f0] p-6 shadow-[0_10px_30px_rgba(120,70,11,0.08)]">
          <h2 className="text-2xl tenor-sans text-[#8a4700]">Saved Addresses</h2>
          {addresses.length === 0 ? (
            <p className="mt-3 rounded-xl border border-[#ffcf90] bg-white px-4 py-3 text-sm text-[#7a5b35]">
              No saved addresses yet. Add your first address above.
            </p>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {addresses.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-[#ffd8a8] bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#a75700]">
                        {item.label}
                      </p>
                      {item.isDefault && (
                        <span className="mt-1 inline-block rounded-full bg-[#fff1d6] px-2.5 py-1 text-xs font-semibold text-[#8a4700]">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {!item.isDefault && (
                        <button
                          type="button"
                          onClick={() => handleSetDefault(item.id)}
                          className="rounded-lg border border-[#ffb25b] bg-[#fff7e8] px-2.5 py-1 text-xs font-semibold text-[#8a4700] hover:bg-[#ffe8c2]"
                        >
                          Set Default
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleEditAddress(item.id)}
                        className="rounded-lg bg-[#ff8a00] px-2.5 py-1 text-xs font-semibold text-white hover:bg-[#f17f00]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteAddress(item.id)}
                        className="rounded-lg bg-red-500 px-2.5 py-1 text-xs font-semibold text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-[#5d3b1d]">{item.receiverName}</p>
                  <p className="text-sm text-[#6b5b45]">{item.phone}</p>
                  <p className="mt-2 text-sm text-[#6b5b45]">
                    {item.line1}
                    {item.line2 ? `, ${item.line2}` : ""}
                  </p>
                  <p className="text-sm text-[#6b5b45]">
                    {item.city}, {item.state} - {item.pincode}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Profile;
