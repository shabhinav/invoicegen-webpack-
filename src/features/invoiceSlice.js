import { createSlice } from "@reduxjs/toolkit";

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    invoiceData: null,
  },
  reducers: {
    invoicesData: (state, action) => {
      state.invoiceData = action.payload;
    },
  },
});

export const { invoicesData } = invoiceSlice.actions;

export const selectInvoice = (state) => state.invoice.invoiceData;

export default invoiceSlice.reducer;
