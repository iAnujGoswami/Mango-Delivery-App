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
    <nav className="max-w-7xl mx-auto flex justify-between items-center py-3 px-6">
      <Link to="/" className="navbar-link">
        <span aria-hidden="true">🏠 </span>
        <span>Home</span>
      </Link>

      <div className="flex gap-3 flex-wrap justify-end">
        <Link to="/about" className="navbar-link inline-flex items-center gap-2">
          <span aria-hidden="true">👥 </span>
          <span>About Us</span>
        </Link>

        <div className="relative group">
          <Link to="/products" className="navbar-link inline-flex items-center gap-2">
            <span aria-hidden="true">🥭 </span>
            <span>Products</span>
          </Link>

          <div className="absolute left-0 top-full mt-2 min-w-44 rounded-2xl border border-[#ffb25b] bg-[#fff7e8] p-2 shadow-md opacity-0 invisible translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 z-30">
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

        <Link to="/cart" className="navbar-link inline-flex items-center gap-2">
          <span aria-hidden="true">🧺 </span>
          <span>Cart</span>
        </Link>

        <div className="relative group">
          <Link to="/login" className="navbar-link inline-flex items-center gap-2">
            <span aria-hidden="true">👨‍🌾 </span>
            <span>Login</span>
          </Link>

          <div className="absolute right-0 top-full mt-2 min-w-56 rounded-2xl border border-[#ffb25b] bg-[#fff7e8] p-2 shadow-md opacity-0 invisible translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 z-30">
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
  );
}

export default Navbar;
