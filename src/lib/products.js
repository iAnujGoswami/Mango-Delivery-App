const FALLBACK_PRODUCT_IMAGE = "/Logo.jpg";

function normalizePrice(price) {
  const numericPrice = Number(price);
  return Number.isFinite(numericPrice) ? numericPrice : 0;
}

export function normalizeProduct(product) {
  return {
    ...product,
    id: product.id,
    image: product.image_url || FALLBACK_PRODUCT_IMAGE,
    price: normalizePrice(product.price),
  };
}

export { FALLBACK_PRODUCT_IMAGE };
