import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  syncCartToSupabase,
} from '../cartSlice';

export const cartSyncListener = createListenerMiddleware();

cartSyncListener.startListening({
  matcher: isAnyOf(addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart),
  effect: async (_, api) => {
    api.dispatch(syncCartToSupabase());
  },
});