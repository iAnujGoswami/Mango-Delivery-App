import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="max-w-7xl mx-auto flex justify-between items-center py-3 px-6">
      <Link to="/" className="navbar-link">
        Home
      </Link>

      <div className="flex gap-3 flex-wrap justify-end">
        <Link to="/about" className="navbar-link">About Us</Link>
        <Link to="/products" className="navbar-link">Produts</Link>
        <Link to="/cart" className="navbar-link">Cart</Link>
        <Link to="/login" className="navbar-link">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
