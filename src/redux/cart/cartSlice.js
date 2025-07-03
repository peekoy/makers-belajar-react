import { createSlice } from '@reduxjs/toolkit';

const saveCart = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.log('error: ', error);
  }
};

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const itemInCart = state.find((item) => item.id === id);
      if (itemInCart) {
        itemInCart.qty++;
      } else {
        state.push({ id, qty: 1 });
      }
      saveCart(state);
    },
    deleteSingleCart: (state, action) => {
      const { id } = action.payload;
      const itemIndex = state.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        if (state[itemIndex].qty > 1) {
          state[itemIndex].qty--;
        } else {
          state.splice(itemIndex, 1);
        }
        saveCart(state);
      }
    },
    deleteAllCart: () => {
      saveCart([]);
      return [];
    },
  },
});

export const { addToCart, deleteSingleCart, deleteAllCart } = cartSlice.actions;
export default cartSlice.reducer;
