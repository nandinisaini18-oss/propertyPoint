
export function formatPrice(price) {
  if (!price) return "₹0";

  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }

  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} Lakh`;
  }

  return `₹${new Intl.NumberFormat("en-IN").format(price)}`;
}