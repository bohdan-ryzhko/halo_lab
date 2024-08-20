import { wsStatuses } from "../constants";

export type CaveStatus = keyof typeof wsStatuses;

export type CaveState = {
  data: [number, number][];
  width: number;
  status: CaveStatus | "";
  error: unknown;
};
