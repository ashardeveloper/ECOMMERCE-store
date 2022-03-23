import { createSlice } from "@reduxjs/toolkit";

const cartItemSlice = createSlice({
  name: "cartItem",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      // const existingItem = state.items.find((item) => item.id === newItem.id);
      const existingItem = state.items.find(
        (item) => item.id === newItem.id && item.size === newItem.size
      );
      console.log(existingItem);
      state.changed = true;
      // const findSize = state.items.find((item) => item.size === newItem.size);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          image: newItem.image,
          price: newItem.price,
          quantity: newItem.quantity,
          title: newItem.title,
          color: newItem.color,
          size: newItem.size,
          subTotal: newItem.price * newItem.quantity,
        });
        state.totalQuantity += newItem.quantity;
        if (newItem.quantity === 1) {
          state.totalPrice += newItem.price;
        } else {
          state.totalPrice += newItem.price * newItem.quantity;
        }
      } else {
        // const findItem = state.items.filter((item) => item.id === existingItem.id);

        state.totalQuantity += newItem.quantity;
        existingItem.quantity += newItem.quantity;
        // console.log(state.totalPrice - existingItem.subTotal);
        state.totalPrice = state.totalPrice - existingItem.subTotal;
        existingItem.subTotal = existingItem.price * existingItem.quantity;
        state.totalPrice += existingItem.subTotal;
      }
    },
    removeItemFromCart(state, action) {
      const removeItem = action.payload;
      // const existingItem = state.items.find(
      //   (item) => item.id === removeItem.id
      // );
      const existingItem = state.items.find(
        (item) => item.id === removeItem.id && item.size === removeItem.size
      );

      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== removeItem.id);
        state.totalPrice = state.totalPrice - existingItem.price;
      } else {
        existingItem.quantity--;
        existingItem.subTotal = existingItem.subTotal - existingItem.price;
        state.totalPrice = state.totalPrice - existingItem.price;
      }
    },
    clearCart(state, actions) {
      const value = actions.payload;
      if (value) {
        state.items = [];
        state.totalPrice = 0;
        state.totalQuantity = 0;
      }
    },
  },
});

export const cartItemActions = cartItemSlice.actions;

export default cartItemSlice;
