import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DroneState, Coordinates } from "../../interfaces";

const initialState: DroneState = {
  position: {
    x: 250,
    y: 0,
  },
  isCrashed: false,
  speed: {
    y: 1,
    x: 5,
  },
};

const droneSlice = createSlice({
  name: "drone",
  initialState,
  reducers: {
    setPosition(state, { payload }: PayloadAction<Coordinates>) {
      state.position = payload;
    },
    setCrashed(state, { payload }: PayloadAction<boolean>) {
      state.isCrashed = payload;
    },
    resetPosition(state) {
      state.position = initialState.position;
    },
    changeSpeed(state, { payload }: PayloadAction<Coordinates>) {
      if (payload.y > 5 || payload.y < 1) return;

      state.speed = payload;
    },
  },
});

export const { setPosition, setCrashed, resetPosition, changeSpeed } =
  droneSlice.actions;
export const droneReducer = droneSlice.reducer;
