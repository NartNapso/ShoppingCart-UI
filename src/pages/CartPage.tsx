import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import { fetchCart } from "../features/cart/cartSlice";
import AddProductForm from "../components/AddProductForm";
import CartList from "../components/CartList";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state?.cart?.categories);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="cart-page">
      <AddProductForm />
      <CartList />
      {Object.keys(cart).length > 0 && (
        <button className="checkout-btn" onClick={() => navigate("/checkout")}>
          המשך להזמנה
        </button>
      )}
    </div>
  );
};

export default CartPage;
