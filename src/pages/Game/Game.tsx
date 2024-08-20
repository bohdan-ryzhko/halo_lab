import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useReduxStore } from "../../hooks";
import {
  fetchToken,
  resetCave,
  resetPosition,
  setCrashed,
  setStatistics,
  setWin,
} from "../../redux";

import { ExitGame, HalloModal, Loader } from "../../components";
import { Cave, Speedometer } from "./parts";

import { routes } from "../../constants";

import styles from "./styles.module.scss";

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

  const handleClose = () => {
    dispatch(setCrashed(false));
    dispatch(resetCave());
    dispatch(resetPosition());
    navigate(routes.welcome);
  };

  return (
    <div className={styles.wrapper}>
      {auth.loading && <Loader fullScreen />}

      {!auth.loading && Boolean(auth.error) && <ExitGame />}

      {!auth.loading && Boolean(!auth.error) && (
        <div>
          <Speedometer />
          <Cave />
        </div>
      )}

      <HalloModal
        showButton={false}
        showCancelButton={false}
        open={drone.isCrashed}
        setOpen={handleClose}
        title="The drone crashed!"
      />

      <HalloModal
        showButton={false}
        showCancelButton={false}
        open={init.isWin}
        setOpen={() => {
          handleClose();
          dispatch(setWin(false));
        }}
        title="Winner!"
      />
    </div>
  );
};
