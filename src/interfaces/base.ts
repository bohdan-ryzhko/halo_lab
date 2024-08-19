export interface IBaseSliceState<T> {
  loading: boolean;
  error: unknown;
  data: T;
}

export interface IHasId {
  id: string;
}
