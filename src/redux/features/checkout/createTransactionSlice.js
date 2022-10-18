import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postTransactionData } from '../../../apis/transaction';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

export const createTransactionData = createAsyncThunk(
  'createTransaction/postData',
  async (data) => {
    const response = await postTransactionData(data);
    return response.data;
  },
);

const createTransactionSlice = createSlice({
  name: 'createTransaction',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createTransactionData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTransactionData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(createTransactionData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default createTransactionSlice.reducer;
