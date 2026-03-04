
import './App.css'

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from './pages/Products';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import AboutUs from "./pages/AboutUs";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
function App() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("mango_cart_items");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("mango_cart_items", JSON.stringify(cartItems));
  }, [cartItems]);

  function handleAddToCart(product) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function handleIncreaseCartItem(productId) {
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item))
    );
  }

  function handleDecreaseCartItem(productId) {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  }

  function handleDeleteCartItem(productId) {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/products"
          element={
            <Products
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onIncreaseItem={handleIncreaseCartItem}
              onDecreaseItem={handleDecreaseCartItem}
            />
          }
        />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onIncreaseItem={handleIncreaseCartItem}
              onDecreaseItem={handleDecreaseCartItem}
              onDeleteItem={handleDeleteCartItem}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

