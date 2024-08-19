import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { IInitGame, IHasId } from "../../interfaces";

const InitEndpoints = {
  init: "/init",
} as const;

export const initApp = createAsyncThunk<IHasId, IInitGame>(
  "init/initApp",
  async (payload, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IHasId> = await axios.post(
        InitEndpoints.init,
        payload
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
