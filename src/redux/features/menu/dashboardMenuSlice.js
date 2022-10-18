import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isActive: true,
  screenSize: 0,
};

const dashboardMenuSlice = createSlice({
  name: 'dashboardMenu',
  initialState,
  reducers: {
    setDashboardMenuOn: (state) => {
      state.isActive = true;
    },
    setDashboardMenuOff: (state) => {
      state.isActive = false;
    },
    setScreenSize: (state, action) => {
      state.screenSize = action.payload;
    },
  },
});

export default dashboardMenuSlice.reducer;
export const {
  setDashboardMenuOn,
  setDashboardMenuOff,
  setScreenSize,
} = dashboardMenuSlice.actions;
