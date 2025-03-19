const CHECKOUT_API_URL = "http://localhost:5000/api/checkout";
const CART_API_URL = "http://localhost:5178/api/cart";

export interface CheckoutData {
  fullName: string;
  address: string;
  email: string;
  cart: { [key: string]: any[] };
}

export const submitOrder = async (orderData: CheckoutData): Promise<boolean> => {
  try {
    const response = await fetch(CHECKOUT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      console.error("Order submission failed:", await response.text());
      return false;
    }

    console.log("Order submitted successfully!");

    await fetch(CART_API_URL, { method: "DELETE" });

    return true;
  } catch (error) {
    console.error("Error sending order:", error);
    return false;
  }
};
