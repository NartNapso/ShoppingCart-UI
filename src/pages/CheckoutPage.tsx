import React, { useState, FormEvent, JSX } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../app/store";
import { submitOrder } from "../services/checkoutService";
import { clearCart, fetchCart } from "../features/cart/cartSlice";
import "./styles/CheckoutPage.css";

const CheckoutPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.categories);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!fullName || !address || !email) {
      setErrorMessage("❌ יש למלא את כל השדות");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    const orderData = {
      fullName,
      address,
      email,
      cart,
    };

    try {
      const success = await submitOrder(orderData);

      if (success) {
        setSuccessMessage("✅ ההזמנה בוצעה בהצלחה!");

        dispatch(clearCart());

        await dispatch(fetchCart());

        setTimeout(() => navigate("/"), 2000);
      } else {
        setErrorMessage("❌ שגיאה בשליחת ההזמנה");
      }
    } catch (error) {
      setErrorMessage("❌ שגיאה בהזמנה, נסה שוב.");
      console.error("Order Error:", error);
    }

    setIsSubmitting(false);
  };

  const getCheckoutNameInput = (): JSX.Element => {
    return (
      <div className="checkout-input-group">
        <label>שם מלא:</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="הכנס שם מלא" />
      </div>
    );
  };
  const getCheckoutAddressInput = (): JSX.Element => {
    return (
      <div className="checkout-input-group">
        <label>כתובת מלאה:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="הכנס כתובת למשלוח" />
      </div>
    );
  };

  const getCheckoutEmailInput = (): JSX.Element => {
    return (
      <div className="checkout-input-group">
        <label>📧 מייל:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="הכנס כתובת מייל" />
      </div>
    );
  };

  return (
    <div className="checkout-container">
      <h2>🛒 סיכום ההזמנה</h2>

      <div className="checkout-card">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>📋 פרטי המזמין</h3>
          {getCheckoutNameInput()}
          {getCheckoutAddressInput()}
          {getCheckoutEmailInput()}

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <h3>🛍 רשימת המוצרים:</h3>
          <ul className="order-summary">
            {Object.entries(cart).map(([category, items]) => (
              <li key={category}>
                <strong>{category}</strong>
                <ul>
                  {items.map((item) => (
                    <li key={item.id}>
                      {item.name} - {item.quantity}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <button type="submit" className="confirm-button" disabled={isSubmitting}>
            {isSubmitting ? "שולח הזמנה..." : "✅ אשר הזמנה"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
