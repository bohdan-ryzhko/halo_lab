import { FC, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export const ExitGame: FC = () => {
  const location = useLocation();

  const backLinkRef = useRef(location.state?.from || "/");

  return (
    <div>
      <Link to={backLinkRef.current}>Go back</Link>
      <p>Something went wrong</p>
    </div>
  );
};
