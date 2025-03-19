import React from 'react';
import { CartItem as CartItemType } from '../features/cart/cartTypes';
import '../components/styles/CartItem.css';

const CartItem: React.FC<{ item: CartItemType; onRemove: () => void }> = ({ item, onRemove }) => {
  return (
    <li className="cart-item">
      {item.name} - {item.quantity}
      <button className="remove-button" onClick={onRemove}>❌</button>
    </li>
  );
};

export default CartItem;
