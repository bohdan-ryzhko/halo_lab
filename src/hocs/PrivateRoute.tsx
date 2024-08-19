import { Navigate } from "react-router-dom";
import { useReduxStore } from "../hooks";
import { FC, ReactNode } from "react";

type props = {
  component: ReactNode;
  redirectTo?: string;
};

export const PrivateRoute: FC<props> = ({
  component: Component,
  redirectTo = "/",
}) => {
  const { auth } = useReduxStore();

  return auth.data.token !== "" ? <Navigate to={redirectTo} /> : Component;
};
