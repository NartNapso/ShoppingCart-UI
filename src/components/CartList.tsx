import React from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import { removeItem } from "../features/cart/cartSlice";
import "./../components/styles/CartList.css";
import { useNavigate } from "react-router-dom";

const CartList: React.FC = () => {
  const cart = useAppSelector((state) => state.cart.categories);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <h2>🛒 סל הקניות</h2>

      <div className="categories-container">
        {Object.keys(cart).map((category) =>
          category !== "undefined" && (
            <div key={category} className="category">
              <h3 className="category-header">{category}</h3>

              <ul>
                {Array.isArray(cart[category]) ? (
                  cart[category].map((item: any) => (
                    <li key={item.id} className="cart-item" title={`${item.name} - ${item.quantity}`}>
                      {item.name} - {item.quantity}
                      <button className="remove-btn" onClick={() => dispatch(removeItem({ id: item.id }))}>
                        ❌
                      </button>
                    </li>
                  ))
                ) : (
                  <p>אין מוצרים בקטגוריה זו.</p>
                )}
              </ul>
            </div>
          )
        )}
      </div>

      {Object.keys(cart).length > 0 && (
        <button className="checkout-btn" onClick={() => navigate("/checkout")}>
          המשך להזמנה
        </button>
      )}
    </div>
  );
};

export default CartList;
