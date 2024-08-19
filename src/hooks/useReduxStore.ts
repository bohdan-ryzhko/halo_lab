import { useSelector } from "react-redux";
import { RootState } from "../redux";

export const useReduxStore = (): RootState => ({
  init: useSelector((state: RootState) => state.init),
  auth: useSelector((state: RootState) => state.auth),
  cave: useSelector((state: RootState) => state.cave),
  drone: useSelector((state: RootState) => state.drone),
});
