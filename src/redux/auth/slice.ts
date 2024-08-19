import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchToken } from "./thunks";
import { AuthState } from "../../interfaces";

const initialState: AuthState = {
  loading: false,
  error: null,
  data: {
    token: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.fulfilled, (state, { payload }) => {
        state.data.token = payload;
      })
      .addMatcher(isAnyOf(fetchToken.pending), (state) => {
        state.loading = true;
      })
      .addMatcher(isAnyOf(fetchToken.fulfilled), (state) => {
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isAnyOf(fetchToken.rejected), (state, { error }) => {
        state.loading = false;
        state.error = error;
      });
  },
});

export const authReducer = authSlice.reducer;
