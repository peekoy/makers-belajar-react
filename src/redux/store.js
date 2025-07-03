// toolkit
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import cartReducer from './cart/cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;

// legacy
// import { legacy_createStore, applyMiddleware, compose } from 'redux';
// import { thunk } from 'redux-thunk';
// import rootReducer from './rootReducer';

// const componseEnhancers =
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = legacy_createStore(
//   rootReducer,
//   componseEnhancers(applyMiddleware(thunk))
// );

// // store.subscribe(() => {
// //   const state = store.getState();
// //   localStorage.setItem('cart', JSON.stringify(state.cart));
// // });

// export default store;
