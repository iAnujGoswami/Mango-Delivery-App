import { normalizeProduct } from "./products";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function fetchJson(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return null;
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

export async function createOrder(orderPayload) {
  return fetchJson("/api/orders/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderPayload),
  });
}

export async function fetchAddresses(profileEmail) {
  const params = new URLSearchParams({ email: profileEmail });
  return fetchJson(`/api/addresses/?${params.toString()}`);
}

export async function createAddress(addressPayload) {
  return fetchJson("/api/addresses/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addressPayload),
  });
}

export async function updateAddress(addressId, profileEmail, addressPayload) {
  const params = new URLSearchParams({ email: profileEmail });
  return fetchJson(`/api/addresses/${addressId}/?${params.toString()}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addressPayload),
  });
}

export async function deleteAddress(addressId, profileEmail) {
  const params = new URLSearchParams({ email: profileEmail });
  return fetchJson(`/api/addresses/${addressId}/?${params.toString()}`, {
    method: "DELETE",
  });
}
