import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: localStorage.getItem("token"),
    isFetching: false,
    error: false,
    // token: localStorage.getItem("token"),
  },
  reducers: {
    loginStart(state) {
      state.isFetching = true;
    },
    loginSuccess(state, action) {
      state.isFetching = false;
      state.currentUser = action.payload;
      // state.token = action.payload.idToken;
      state.error = false;
      localStorage.setItem("token", state.currentUser);
    },
    loginFailure(state) {
      state.isFetching = false;
      state.error = true;
    },
    logOut(state, action) {
      state.currentUser = null;
      localStorage.removeItem("token");
    },
  },
});

export const userSliceActions = userSlice.actions;

export default userSlice;
