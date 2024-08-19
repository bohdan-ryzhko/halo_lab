import { FC, useEffect } from "react";
import { useAppDispatch, useReduxStore } from "../../hooks";
import {
  fetchToken,
  resetCave,
  resetPosition,
  setCrashed,
  setStatistics,
  setWin,
} from "../../redux";
import { HalloModal, Loader } from "../../components";
import { Cave } from "./parts";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";

export const Game: FC = () => {
  const { init, auth, drone } = useReduxStore();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!init.data?.id) return;

    dispatch(fetchToken(init.data.id));
  }, [dispatch, init.data?.id]);

  useEffect(() => {
    dispatch(
      setStatistics({
        ...init.statistics,
        attempts: init.statistics.attempts + 1,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleOpen = () => {
    dispatch(setCrashed(false));
    dispatch(resetCave());
    dispatch(resetPosition());
    navigate(routes.welcome);
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", justifyContent: "center" }}
    >
      {auth.loading && <Loader fullScreen />}

      {!auth.loading && Boolean(auth.error) && <>Reload page</>}

      {!auth.loading && Boolean(!auth.error) && <Cave />}

      <HalloModal
        showButton={false}
        showCancelButton={false}
        open={drone.isCrashed}
        setOpen={toggleOpen}
        title="The drone crashed!"
      />

      <HalloModal
        showButton={false}
        showCancelButton={false}
        open={init.isWin}
        setOpen={() => {
          toggleOpen();
          dispatch(setWin(false));
        }}
        title="Winner!"
      />
    </div>
  );
};
