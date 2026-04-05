import { useEffect, useMemo, useState } from "react";
import Navbar from "../Components/Navbar";
import { createAddress, deleteAddress, fetchAddresses, updateAddress } from "../lib/api";

const PROFILE_STORAGE_KEY = "mango_user_profile";

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

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function mapAddressFromApi(address) {
  return {
    id: address.id,
    label: address.label || "Home",
    receiverName: address.receiver_name || "",
    phone: address.phone || "",
    line1: address.line1 || "",
    line2: address.line2 || "",
    city: address.city || "",
    state: address.state || "",
    pincode: address.pincode || "",
    isDefault: !!address.is_default,
  };
}

function buildAddressPayload(addressForm, profileEmail) {
  return {
    profile_email: profileEmail,
    label: addressForm.label,
    receiver_name: addressForm.receiverName,
    phone: addressForm.phone,
    line1: addressForm.line1,
    line2: addressForm.line2,
    city: addressForm.city,
    state: addressForm.state,
    pincode: addressForm.pincode,
    is_default: addressForm.isDefault,
  };
}

function Profile() {
  const initialProfile = readLocalStorage(PROFILE_STORAGE_KEY, EMPTY_PROFILE);
  const [profile, setProfile] = useState(initialProfile);
  const [activeEmail, setActiveEmail] = useState(() => normalizeEmail(initialProfile.email));
  const [addresses, setAddresses] = useState([]);
  const [addressForm, setAddressForm] = useState(EMPTY_ADDRESS);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [notice, setNotice] = useState("");
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [isAddressSubmitting, setIsAddressSubmitting] = useState(false);

  const isEditing = useMemo(() => editingAddressId !== null, [editingAddressId]);

  function showNotice(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  }

  async function loadAddresses(profileEmail) {
    if (!profileEmail) {
      setAddresses([]);
      return;
    }

    try {
      setIsAddressLoading(true);
      const response = await fetchAddresses(profileEmail);
      setAddresses(response.map(mapAddressFromApi));
    } catch {
      showNotice("Unable to load saved addresses right now.");
    } finally {
      setIsAddressLoading(false);
    }
  }

  useEffect(() => {
    loadAddresses(activeEmail);
  }, [activeEmail]);

  function handleProfileChange(e) {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }

  function handleSaveProfile(e) {
    e.preventDefault();
    const normalizedEmail = normalizeEmail(profile.email);
    const nextProfile = { ...profile, email: normalizedEmail };
    setProfile(nextProfile);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(nextProfile));
    setActiveEmail(normalizedEmail);
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

  function getProfileEmailForAddressBook() {
    const normalizedEmail = normalizeEmail(profile.email);
    if (!normalizedEmail) {
      showNotice("Save your profile email before managing addresses.");
      return "";
    }

    if (normalizedEmail !== activeEmail) {
      showNotice("Save your profile first so addresses are linked to the correct email.");
      return "";
    }

    return normalizedEmail;
  }

  async function handleSaveAddress(e) {
    e.preventDefault();

    const profileEmail = getProfileEmailForAddressBook();
    if (!profileEmail) {
      return;
    }

    try {
      setIsAddressSubmitting(true);
      const payload = buildAddressPayload(addressForm, profileEmail);

      if (isEditing) {
        await updateAddress(editingAddressId, profileEmail, payload);
        showNotice("Address updated.");
      } else {
        await createAddress(payload);
        showNotice("Address saved.");
      }

      resetAddressForm();
      await loadAddresses(profileEmail);
    } catch {
      showNotice("Unable to save address right now.");
    } finally {
      setIsAddressSubmitting(false);
    }
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

  async function handleDeleteAddress(addressId) {
    const profileEmail = getProfileEmailForAddressBook();
    if (!profileEmail) {
      return;
    }

    try {
      await deleteAddress(addressId, profileEmail);
      if (editingAddressId === addressId) {
        resetAddressForm();
      }
      await loadAddresses(profileEmail);
      showNotice("Address deleted.");
    } catch {
      showNotice("Unable to delete address right now.");
    }
  }

  async function handleSetDefault(addressId) {
    const profileEmail = getProfileEmailForAddressBook();
    const selected = addresses.find((item) => item.id === addressId);
    if (!profileEmail || !selected) {
      return;
    }

    try {
      await updateAddress(
        addressId,
        profileEmail,
        buildAddressPayload({ ...selected, isDefault: true }, profileEmail)
      );
      if (editingAddressId === addressId) {
        setAddressForm((prev) => ({ ...prev, isDefault: true }));
      }
      await loadAddresses(profileEmail);
      showNotice("Default address updated.");
    } catch {
      showNotice("Unable to update default address right now.");
    }
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
          {notice ? (
            <div className="mt-4 rounded-xl border border-[#ffcf90] bg-[#fff7e8] px-4 py-2 text-sm font-semibold text-[#8a4700]">
              {notice}
            </div>
          ) : null}
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
                  disabled={isAddressSubmitting}
                  className="rounded-xl bg-[#ff8a00] px-5 py-2.5 font-semibold text-white transition hover:bg-[#f17f00] disabled:cursor-not-allowed disabled:bg-[#ffcc94]"
                >
                  {isAddressSubmitting ? "Saving..." : isEditing ? "Update Address" : "Save Address"}
                </button>
                {isEditing ? (
                  <button
                    type="button"
                    onClick={resetAddressForm}
                    className="rounded-xl border border-[#ffb25b] bg-white px-5 py-2.5 font-semibold text-[#8a4700] transition hover:bg-[#ffe8c2]"
                  >
                    Cancel Edit
                  </button>
                ) : null}
              </div>
            </form>
          </section>
        </div>

        <section className="mt-6 rounded-3xl border border-[#ffd8a8] bg-[#fff9f0] p-6 shadow-[0_10px_30px_rgba(120,70,11,0.08)]">
          <h2 className="text-2xl tenor-sans text-[#8a4700]">Saved Addresses</h2>
          {!activeEmail ? (
            <p className="mt-3 rounded-xl border border-[#ffcf90] bg-white px-4 py-3 text-sm text-[#7a5b35]">
              Save your profile email to start storing addresses in your account.
            </p>
          ) : isAddressLoading ? (
            <p className="mt-3 rounded-xl border border-[#ffcf90] bg-white px-4 py-3 text-sm text-[#7a5b35]">
              Loading saved addresses...
            </p>
          ) : addresses.length === 0 ? (
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
                      {item.isDefault ? (
                        <span className="mt-1 inline-block rounded-full bg-[#fff1d6] px-2.5 py-1 text-xs font-semibold text-[#8a4700]">
                          Default
                        </span>
                      ) : null}
                    </div>
                    <div className="flex gap-2">
                      {!item.isDefault ? (
                        <button
                          type="button"
                          onClick={() => handleSetDefault(item.id)}
                          className="rounded-lg border border-[#ffb25b] bg-[#fff7e8] px-2.5 py-1 text-xs font-semibold text-[#8a4700] hover:bg-[#ffe8c2]"
                        >
                          Set Default
                        </button>
                      ) : null}
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
