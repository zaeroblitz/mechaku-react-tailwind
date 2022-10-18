import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addCartItem,
  decrementCartItem,
  getCartItemByUser,
  incrementCartItem,
  removeCartItem,
} from '../../../apis/cart';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

export const fetchUserCarts = createAsyncThunk(
  'cart/fetchUserCarts',
  async ({ token, userId }) => {
    const response = await getCartItemByUser(token, userId);
    return response.data;
  },
);

export const fetchAddCartItem = createAsyncThunk(
  'cart/fetchAddCartItem',
  async ({ token, data }) => {
    const response = await addCartItem(token, data);
    return response.data;
  },
);

export const fetchIncrementCartItem = createAsyncThunk(
  'cart/incrementCartItem',
  async ({ token, itemId }) => {
    await incrementCartItem(token, itemId);
    return itemId;
  },
);

export const fetchDecrementCartItem = createAsyncThunk(
  'cart/decrementCartItem',
  async ({ token, itemId }) => {
    await decrementCartItem(token, itemId);
    return itemId;
  },
);

/*
  data parameter only contains itemId
  which in API body request, the key and value is:
  item: itemId
*/
export const fetchRemoveCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async ({ token, userId, data }) => {
    await removeCartItem(token, userId, data);
    return data.item;
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserCarts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserCarts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(fetchUserCarts.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchIncrementCartItem.fulfilled, (state, action) => {
      const selectedItem = state.data.items.find(
        (item) => item._id === action.payload,
      );

      if (selectedItem) {
        selectedItem.amount += 1;
      }
    });
    builder.addCase(fetchDecrementCartItem.fulfilled, (state, action) => {
      const selectedItem = state.data.items.find(
        (item) => item._id === action.payload,
      );

      if (selectedItem) {
        selectedItem.amount -= 1;
      }
    });
    builder.addCase(fetchRemoveCartItem.fulfilled, (state, action) => {
      state.data.items = state.data.items.filter(
        (item) => item._id !== action.payload,
      );
    });
    builder.addCase(fetchAddCartItem.fulfilled, (state, action) => {
      state.data.items.push(action.payload);
    });
  },
});

export default cartSlice.reducer;
