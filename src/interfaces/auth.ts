import { IBaseSliceState } from "./base";

export type Chunk = {
  no: number;
  chunk: string;
};

export interface AuthState extends IBaseSliceState<{ token: string }> {}
