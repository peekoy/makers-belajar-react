import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      addToCart: (id) =>
        set((state) => {
          const itemInCart = state.cart.find((item) => item.id === id);
          if (itemInCart) {
            return {
              cart: state.cart.map((item) =>
                item.id === id ? { ...item, qty: item.qty + 1 } : item
              ),
            };
          } else {
            return { cart: [...state.cart, { id, qty: 1 }] };
          }
        }),
      deleteSingleCart: (id) =>
        set((state) => {
          const itemToDelete = state.cart.find((item) => item.id === id);
          if (itemToDelete && itemToDelete.qty > 1) {
            return {
              cart: state.cart.map((item) =>
                item.id === id ? { ...item, qty: item.qty - 1 } : item
              ),
            };
          } else {
            return {
              cart: state.cart.filter((item) => item.id !== id),
            };
          }
        }),
      deleteAllCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
