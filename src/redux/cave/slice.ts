import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CaveState } from "../../interfaces";

const initialState: CaveState = {
  data: [],
  width: 500,
};

const caveSlice = createSlice({
  name: "cave",
  initialState,
  reducers: {
    setCaveCoordinates(state, action: PayloadAction<[number, number]>) {
      state.data = [...state.data, action.payload];
    },
    resetCave(state) {
      state.data = initialState.data;
    },
  },
});

export const { setCaveCoordinates, resetCave } = caveSlice.actions;
export const caveReducer = caveSlice.reducer;
