import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import invoiceReducer from "../features/invoiceSlice";
import previewReducer from "../features/previewSilce";
import navbarReducer from "../features/navbarSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    invoice: invoiceReducer,
    preview: previewReducer,
    navbar: navbarReducer,
  },
});
