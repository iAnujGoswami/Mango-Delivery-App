const FALLBACK_PRODUCT_IMAGE = "/Logo.jpg";
const PRODUCT_IMAGE_FALLBACKS = {
  mango: "/ChatGPTMango.jpg",
  coconut: "/ChatGPT Coconut.jpg",
  guava: "/ChatGPTGuava.jpg",
  chiku: "/ChatGPT Chiku.jpg",
};

function normalizePrice(price) {
  const numericPrice = Number(price);
  return Number.isFinite(numericPrice) ? numericPrice : 0;
}

function resolveFallbackImage(product) {
  const searchableFields = [product.name, product.category, product.description];

  for (const value of searchableFields) {
    if (!value) continue;

    const normalizedValue = String(value).trim().toLowerCase();
    const matchedKey = Object.keys(PRODUCT_IMAGE_FALLBACKS).find((key) =>
      normalizedValue.includes(key)
    );

    if (matchedKey) {
      return PRODUCT_IMAGE_FALLBACKS[matchedKey];
    }
  }

  return FALLBACK_PRODUCT_IMAGE;
}

export function normalizeProduct(product) {
  const fallbackImage = resolveFallbackImage(product);

  return {
    ...product,
    id: product.id,
    image: product.image_url || fallbackImage,
    fallbackImage,
    price: normalizePrice(product.price),
  };
}

export { FALLBACK_PRODUCT_IMAGE };
