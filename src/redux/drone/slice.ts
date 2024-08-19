import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DroneState, Position } from "../../interfaces";

const initialState: DroneState = {
  position: {
    x: 250,
    y: 0,
  },
  isCrashed: false,
};

const droneSlice = createSlice({
  name: "drone",
  initialState,
  reducers: {
    setPosition(state, { payload }: PayloadAction<Position>) {
      state.position = payload;
    },
    setCrashed(state, { payload }: PayloadAction<boolean>) {
      state.isCrashed = payload;
    },
    resetPosition(state) {
      state.position = initialState.position;
    },
  },
});

export const { setPosition, setCrashed, resetPosition } = droneSlice.actions;
export const droneReducer = droneSlice.reducer;
