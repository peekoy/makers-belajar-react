export const ADD_TO_CART = 'ADD_TO_CART';
export const DELETE_SINGLE_CART = 'DELETE_SINGLE_CART';
export const DELETE_ALL_CART = 'DELETE_ALL_CART';

export const addToCart = (id) => ({ type: ADD_TO_CART, payload: { id } });

export const deleteSingleCart = (id) => ({
  type: DELETE_SINGLE_CART,
  payload: { id },
});

export const deleteAllCart = (id) => ({
  type: DELETE_ALL_CART,
  payload: { id },
});
