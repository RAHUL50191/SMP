import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    jwt: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.jwt = action.payload;

      state.loading = false;
      state.error = null;
    },
    loginFail(state, action) {
      state.jwt = null;
      state.loading = false;
      state.error = action.payload;
    },
    registerRequest(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action) {
      state.jwt = action.payload;
      state.loading = false;
      state.error = null;
    },
    registerFail(state, action) {
      state.jwt = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFail, registerRequest, registerSuccess, registerFail } = authSlice.actions;

export default authSlice.reducer;
