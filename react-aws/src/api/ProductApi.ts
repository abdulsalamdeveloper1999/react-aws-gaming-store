export async function fetchProducts() {
  const response = await fetch(
    "http://localhost:8080/api/product/get-products"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}
