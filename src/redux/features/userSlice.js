import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { putUserData, setSignIn } from '../../apis/user';

let initialState = {
  loading: false,
  isLogin: false,
  token: '',
  user: {},
  error: '',
};

const uglyToken = Cookies.get('token');
if (uglyToken) {
  const token = atob(uglyToken);
  const jwtToken = jwtDecode(token);
  const { user } = jwtToken;
  initialState = {
    loading: false,
    isLogin: true,
    token,
    user,
    error: '',
  };
}

export const fetchUser = createAsyncThunk('user/signIn', async (data) => {
  const response = await setSignIn(data);
  return response?.data?.token;
});

export const fetchUpdateProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ id, data }) => {
    const response = await putUserData(id, data);
    return response?.data;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    cleanUserState: (state) => {
      Cookies.remove('token');
      state.loading = false;
      state.isLogin = false;
      state.token = '';
      state.user = {};
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      const token = action.payload;

      if (token) {
        const jwtToken = jwtDecode(token);
        const { user } = jwtToken;

        state.loading = false;
        state.isLogin = true;
        state.token = token;
        state.user = user;
        state.error = '';

        const mixedToken = btoa(token);
        Cookies.set('token', mixedToken);
      }
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchUpdateProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUpdateProfile.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.avatar) {
        state.user.avatar = action.payload.avatar;
      }

      if (action.payload.name) {
        state.user.name = action.payload.name;
      }

      if (action.payload.phone_number) {
        state.user.phone_number = action.payload.phone_number;
      }
    });
    builder.addCase(fetchUpdateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
export const { cleanUserState } = userSlice.actions;
