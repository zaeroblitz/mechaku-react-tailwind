import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  total: 0,
  tax: 0,
  grandTotal: 0,
};

const cartTotalSlice = createSlice({
  name: 'cartTotalSlice',
  initialState,
  reducers: {
    incrementItemCart: (state, action) => {
      const price = action.payload;
      const tax = 0.1 * price;

      state.total += price;
      state.tax += tax;
      state.grandTotal += price + tax;
    },
    decrementItemCart: (state, action) => {
      const price = action.payload;
      const tax = 0.1 * price;

      state.total -= price;
      state.tax -= tax;
      state.grandTotal -= price + tax;
    },
    cleanedUpItemCart: (state) => {
      state.total = 0;
      state.tax = 0;
      state.grandTotal = 0;
    },
  },
});

export default cartTotalSlice.reducer;
export const { incrementItemCart, decrementItemCart, cleanedUpItemCart } = cartTotalSlice.actions;
