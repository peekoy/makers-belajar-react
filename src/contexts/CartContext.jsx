import { createContext, useEffect, useReducer } from 'react';

export const CartContext = createContext();

const cartReducer = (state, action) => {
  const { id } = action.payload;
  switch (action.type) {
    case 'ADD_CART': {
      if (state.cart.find((item) => item.id === id)) {
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
    case 'DELETE_SINGLE_CART': {
      const found = state.cart.find((item) => item.id === id);
      if (found && found.qty > 1) {
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
          // localStorage.removeItem('cart');
          // setCart([]);
        }
      }
    }
    case 'DELETE_ALL_CART': {
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

export const CartProvider = ({ children }) => {
  const initialState = {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const handleAddToCart = (id) => {
    dispatch({ type: 'ADD_CART', payload: { id } });
  };

  const handleDeleteSingleCart = (id) => {
    dispatch({ type: 'DELETE_SINGLE_CART', payload: { id } });
  };

  const handleDeleteAllCart = () => {
    dispatch({ type: 'DELETE_ALL_CART' });
  };

  const value = {
    cart: state.cart,
    handleAddToCart,
    handleDeleteSingleCart,
    handleDeleteAllCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
