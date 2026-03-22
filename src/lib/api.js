import { normalizeProduct } from "./products";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function fetchJson(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function fetchProducts() {
  const products = await fetchJson("/api/products/");
  return products.map(normalizeProduct);
}

export async function fetchProduct(productId) {
  const product = await fetchJson(`/api/products/${productId}/`);
  return normalizeProduct(product);
}
