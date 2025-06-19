import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from '../store/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  return {
    items,
    add: (item: any) => dispatch(addToCart(item)),
    remove: (id: string) => dispatch(removeFromCart(id)),
    increase: (id: string) => dispatch(increaseQuantity(id)),
    decrease: (id: string) => dispatch(decreaseQuantity(id)),
    clear: () => dispatch(clearCart()),
  };
};