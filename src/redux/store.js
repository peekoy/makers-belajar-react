import { legacy_createStore } from 'redux';
import cartReducer from './reducer';

const store = legacy_createStore(
  cartReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cart', JSON.stringify(state.cart));
});

export default store;
