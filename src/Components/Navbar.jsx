import { Link } from "react-router-dom";

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
        <Link to="/products" className="navbar-link inline-flex items-center gap-2">
        <span aria-hidden="true">🥭 </span>
        <span>Products</span>
        </Link>
        <Link to="/cart" className="navbar-link inline-flex items-center gap-2">
        <span aria-hidden="true">🧺 </span>
        <span>Cart</span></Link>
        <Link to="/login" className="navbar-link inline-flex items-center gap-2"><span aria-hidden="true">👨‍🌾 </span>
        <span>Login</span></Link>
      </div>
    </nav>
  );
}

export default Navbar;
