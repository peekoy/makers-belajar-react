import { ADD_TO_CART, DELETE_ALL_CART, DELETE_SINGLE_CART } from './actions';

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartReducer = (state = initialState, action) => {
  const id = action.payload?.id;
  switch (action.type) {
    case ADD_TO_CART: {
      const itemInCart = state.cart.find((item) => item.id === id);
      if (itemInCart) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              id,
              qty: 1,
            },
          ],
        };
      }
    }
    case DELETE_SINGLE_CART: {
      const itemToDelete = state.cart.find((item) => item.id === id);
      if (itemToDelete && itemToDelete.qty > 1) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, qty: item.qty - 1 } : item
          ),
        };
      } else {
        const updatedCart = state.cart.filter((item) => item.id !== id);
        if (updatedCart.length > 0) {
          return {
            ...state,
            cart: updatedCart,
          };
        } else {
          return {
            ...state,
            cart: [],
          };
        }
      }
    }
    case DELETE_ALL_CART: {
      return {
        ...state,
        cart: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default cartReducer;
