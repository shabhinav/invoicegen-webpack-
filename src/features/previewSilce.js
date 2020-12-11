import { createSlice } from "@reduxjs/toolkit";

export const previewSlice = createSlice({
  name: "preview",
  initialState: {
    id: null,
  },
  reducers: {
    id: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { id } = previewSlice.actions;

export const selectId = (state) => state.preview.id;

export default previewSlice.reducer;
