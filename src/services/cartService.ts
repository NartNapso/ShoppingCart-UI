import { CartItem } from "../features/cart/cartTypes";

const API_URL = "https://shoppingcartapiapp.azurewebsites.net/api/cart";

export async function getCart() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    console.error("❌ API Error:", response.status, response.statusText);
    return [];
  }

  const data = await response.json();
  return typeof data === "object" ? data : {};
}


export async function addToCart(item: CartItem) {
  const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          id: Number(item.id),
          name: item.name,
          quantity: item.quantity,
          category: item.category
      }),
  });

  return response.json();
}



export async function removeFromCart(id: number) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    return response.json();
}
