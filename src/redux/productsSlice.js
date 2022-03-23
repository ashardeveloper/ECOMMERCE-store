import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    productList: [],
  },
  reducers: {
    addProducts(state, action) {
      const products = action.payload;

      const existingItem = state.productList.find(
        (item) => item.id === products.id
      );
      console.log(existingItem);
      state.changed = true;
      // const findSize = state.items.find((item) => item.size === newItem.size);
      if (!existingItem) {
        state.productList.push({
          id: products.id,
          title: products.title,
        });
      }
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice;
