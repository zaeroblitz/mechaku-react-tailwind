import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const selectedCartSlice = createSlice({
  name: 'selectedCart',
  initialState,
  reducers: {
    addSelectedCart: (state, action) => {
      state.data.push(action.payload);
    },
    uncheckedSelectedCart: (state, action) => {
      state.data = state.data.filter((item) => item.itemId !== action.payload);
    },
    incrementAmount: (state, action) => {
      const selectedCart = state.data.find(
        (item) => item.itemId === action.payload,
      );
      if (selectedCart) {
        selectedCart.amount += 1;
      }
    },
    decrementAmount: (state, action) => {
      const selectedCart = state.data.find(
        (item) => item.itemId === action.payload,
      );
      if (selectedCart) {
        selectedCart.amount -= 1;
      }
    },
    cleanSelectedCart: (state) => {
      state.data = [];
    },
  },
});

export default selectedCartSlice.reducer;
export const {
  addSelectedCart,
  uncheckedSelectedCart,
  incrementAmount,
  decrementAmount,
  cleanSelectedCart,
} = selectedCartSlice.actions;
