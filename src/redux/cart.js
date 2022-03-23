import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state) {
      state.cart = state.cart + 1;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
