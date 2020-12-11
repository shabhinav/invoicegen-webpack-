import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    showNavbar: true,
  },
  reducers: {
    navbar: (state, action) => {
      state.showNavbar = action.payload;
    },
  },
});

export const { navbar } = navbarSlice.actions;

export const selectNavbar = (state) => state.navbar.showNavbar;

export default navbarSlice.reducer;
