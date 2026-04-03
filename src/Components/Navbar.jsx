import { Link } from "react-router-dom";

const PRODUCT_ITEMS = ["Mango", "Coconut", "Chiku", "Guava"];
const LOGIN_MENU_ITEMS = [
  { label: "New customer? Signup", to: "/signup" },
  { label: "My Profile", to: "/profile" },
  { label: "Become a Seller", to: "/seller" },
  { label: "Orders", to: "/orders" },
  { label: "24x7 Customer Care", to: "/customer-care" },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#ffd9ac] bg-[#fff8ec]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ff8a00] text-lg font-bold text-white shadow-[0_12px_30px_rgba(255,138,0,0.28)]">
            M
          </span>
          <span className="block">
            <span className="block text-lg text-[#8a4700] tenor-sans sm:text-xl">Mango Delivery</span>
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#b0620f]">
              Farm fresh in 10 minutes
            </span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <Link to="/" className="navbar-link">
            Home
          </Link>

          <Link to="/about" className="navbar-link">
            About
          </Link>

          <div className="relative group">
            <Link to="/products" className="navbar-link inline-flex items-center gap-2">
              Products
              <span className="text-xs">+</span>
            </Link>

            <div className="invisible absolute left-0 top-full z-30 mt-2 min-w-44 translate-y-1 rounded-2xl border border-[#ffb25b] bg-[#fff7e8] p-2 opacity-0 shadow-md transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {PRODUCT_ITEMS.map((item) => (
                <Link
                  key={item}
                  to={`/products?item=${item.toLowerCase()}`}
                  className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#ff6f00] hover:bg-[#ffe8c2]"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/cart" className="navbar-link">
            Cart
          </Link>

          <div className="relative group">
            <Link to="/login" className="navbar-link inline-flex items-center gap-2">
              Account
              <span className="text-xs">+</span>
            </Link>

            <div className="invisible absolute right-0 top-full z-30 mt-2 min-w-56 translate-y-1 rounded-2xl border border-[#ffb25b] bg-[#fff7e8] p-2 opacity-0 shadow-md transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {LOGIN_MENU_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#ff6f00] hover:bg-[#ffe8c2]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
