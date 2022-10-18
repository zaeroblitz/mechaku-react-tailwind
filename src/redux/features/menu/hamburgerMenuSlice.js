import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isActive: false,
  screenSize: 0,
};

const hamburgerMenuSlice = createSlice({
  name: 'hamburgerMenu',
  initialState,
  reducers: {
    setHamburgerMenuOn: (state) => {
      state.isActive = true;
    },
    setHamburgerMenuOff: (state) => {
      state.isActive = false;
    },
    setScreenSize: (state, action) => {
      state.screenSize = action.payload;
    },
  },
});

export default hamburgerMenuSlice.reducer;
export const {
  setHamburgerMenuOn,
  setHamburgerMenuOff,
  setScreenSize,
} = hamburgerMenuSlice.actions;
