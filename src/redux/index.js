import { configureStore } from "@reduxjs/toolkit";

import cartItemSlice from "./cart-item";
import uiSlice from "./uiSlice";
import userSlice from "./userSlice";
import productsSlice from "./productsSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cartItem: cartItemSlice.reducer,
    ui: uiSlice.reducer,
    products: productsSlice.reducer,
  },
});

export default store;
