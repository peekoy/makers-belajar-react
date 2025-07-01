// src/redux/cart/reducer.js (Versi Refactor)

import { ADD_TO_CART, DELETE_ALL_CART, DELETE_SINGLE_CART } from './types';

const saveCart = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.log('error: ', error);
  }
};

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

const cartReducer = (state = initialState, action) => {
  const id = action.payload?.id;
  switch (action.type) {
    case ADD_TO_CART: {
      let newCart;
      const itemInCart = state.find((item) => item.id === id);
      if (itemInCart) {
        newCart = state.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        newCart = [...state, { id, qty: 1 }];
      }
      saveCart(newCart);
      return newCart;
    }
    case DELETE_SINGLE_CART: {
      let newCart;
      const itemToDelete = state.find((item) => item.id === id);
      if (itemToDelete && itemToDelete.qty > 1) {
        newCart = state.map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        );
      } else {
        newCart = state.filter((item) => item.id !== id);
      }
      saveCart(newCart);
      return newCart;
    }
    case DELETE_ALL_CART: {
      saveCart([]);
      return [];
    }
    default: {
      return state;
    }
  }
};

export default cartReducer;
