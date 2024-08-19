import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { InitState, Statistics } from "../../interfaces";
import { initApp } from "./thunks";

const initialState: InitState = {
  loading: false,
  error: null,
  data: null,
  complexity: null,
  statistics: {
    attempts: 0,
    victories: 0,
    losses: 0,
  },
  isWin: false,
};

const initSlice = createSlice({
  name: "init",
  initialState,
  reducers: {
    setComplexity(state, action: PayloadAction<number>) {
      state.complexity = action.payload;
    },
    setStatistics(state, action: PayloadAction<Statistics>) {
      state.statistics = action.payload;
    },
    resetStatistics(state) {
      state.statistics = initialState.statistics;
    },
    setWin(state, action: PayloadAction<boolean>) {
      state.isWin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initApp.fulfilled, (state, { payload }) => {
        state.data = payload;
      })
      .addMatcher(isAnyOf(initApp.pending), (state) => {
        state.loading = true;
      })
      .addMatcher(isAnyOf(initApp.fulfilled), (state) => {
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isAnyOf(initApp.rejected), (state, { error }) => {
        state.loading = false;
        state.error = error;
      });
  },
});

export const { setComplexity, setStatistics, resetStatistics, setWin } =
  initSlice.actions;
export const initReducer = initSlice.reducer;
