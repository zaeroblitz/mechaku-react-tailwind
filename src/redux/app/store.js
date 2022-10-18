import { configureStore } from '@reduxjs/toolkit';

import { cartApi } from '../query/cartApi';
import { mechakuApi } from '../query/mechakuAPI';

import userReducer from '../features/userSlice';
import cartReducer from '../features/cart/cartSlice';
import cartTotalReducer from '../features/cart/cartTotalSlice';
import selectedCartReducer from '../features/cart/selectedCartSlice';
import hamburgerMenuReducer from '../features/menu/hamburgerMenuSlice';
import dashboardMenuReducer from '../features/menu/dashboardMenuSlice';
import createTransactionReducer from '../features/checkout/createTransactionSlice';

const store = configureStore({
  reducer: {
    auth: userReducer,
    cart: cartReducer,
    cartTotal: cartTotalReducer,
    selectedCart: selectedCartReducer,
    hamburgerMenu: hamburgerMenuReducer,
    dashboardMenu: dashboardMenuReducer,
    createTransaction: createTransactionReducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [mechakuApi.reducerPath]: mechakuApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(mechakuApi.middleware)
    .concat(cartApi.middleware),
});

export default store;
