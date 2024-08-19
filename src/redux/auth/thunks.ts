import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Chunk } from "../../interfaces";

const InitEndpoints = {
  token: (chunkNo: number, id: string) => `/token/${chunkNo}?id=${id}`,
} as const;

const chunkNumbers = [1, 2, 3, 4];

export const fetchToken = createAsyncThunk<string, string>(
  "auth/fetchToken",
  async (id, { rejectWithValue }) => {
    try {
      const tokenPromises: Promise<Chunk>[] = chunkNumbers.map(
        async (chunkNo) =>
          await axios
            .get(InitEndpoints.token(chunkNo, id))
            .then(({ data }) => data)
      );

      const tokenParts = await Promise.all(tokenPromises);

      return tokenParts.reduce((token, { chunk }) => (token += chunk), "");
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
