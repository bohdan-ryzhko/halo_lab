import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CaveState, CaveStatus } from "../../interfaces";

const initialState: CaveState = {
  data: [],
  width: 500,
  status: "",
  error: null,
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
    setCaveStatus(state, action: PayloadAction<CaveStatus>) {
      state.status = action.payload;
    },
    setCaveError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCaveCoordinates, resetCave, setCaveStatus, setCaveError } =
  caveSlice.actions;
export const caveReducer = caveSlice.reducer;
