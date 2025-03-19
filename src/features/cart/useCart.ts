import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { addItem, removeItem } from './cartSlice';
import { CartItem } from './cartTypes';

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.categories);

  const addProductToCart = (item: CartItem) => {
    dispatch(addItem(item));
  };

  const removeProductFromCart = (id: number) => {
      dispatch(removeItem({ id }));
  };

  return { cart, addProductToCart, removeProductFromCart };
};
