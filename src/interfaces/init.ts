import { IBaseSliceState, IHasId } from "./base";

export type Statistics = {
  attempts: number;
  victories: number;
  losses: number;
};

export interface InitState extends IBaseSliceState<IHasId | null> {
  complexity: number | null;
  statistics: Statistics;
  isWin: boolean;
}

export interface IInitGame {
  name: string;
  complexity: string;
}
