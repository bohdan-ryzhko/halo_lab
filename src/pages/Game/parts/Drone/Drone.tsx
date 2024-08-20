import { FC, useCallback, useEffect } from "react";
import { useAppDispatch, useReduxStore } from "../../../../hooks";
import {
  changeSpeed,
  setCrashed,
  setPosition,
  setStatistics,
  setWin,
} from "../../../../redux";
import styles from "./styles.module.scss";
import { droneSpeedX } from "../../../../constants";

type props = {
  scrolling: boolean;
};

export const Drone: FC<props> = ({ scrolling }) => {
  const { init, cave, drone } = useReduxStore();
  const dispatch = useAppDispatch();

  const droneYPoint = cave.data[Math.ceil(drone.position.y / 10)];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const newPosition = { ...drone.position };

      const speed =
        init.complexity &&
        Object.hasOwnProperty.call(droneSpeedX, init.complexity)
          ? droneSpeedX[init.complexity as keyof typeof droneSpeedX]
          : 5;

      switch (event.key) {
        case "ArrowLeft":
          newPosition.x -= speed;
          break;
        case "ArrowRight":
          newPosition.x += speed;
          break;
        case "ArrowUp":
          dispatch(changeSpeed({ ...drone.speed, y: drone.speed.y + 1 }));
          break;
        case "ArrowDown":
          dispatch(changeSpeed({ ...drone.speed, y: drone.speed.y - 1 }));
          break;
        default:
          break;
      }

      dispatch(setPosition(newPosition));
    },
    [dispatch, drone.position, drone.speed, init.complexity]
  );

  useEffect(() => {
    if (drone.isCrashed) return;

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [drone.isCrashed, handleKeyDown]);

  useEffect(() => {
    let interval: number | undefined;

    if (scrolling) {
      if (!droneYPoint) {
        dispatch(
          setStatistics({
            ...init.statistics,
            victories: init.statistics.victories + 1,
          })
        );

        dispatch(setWin(true));

        return;
      }

      interval = setInterval(() => {
        const nextY = drone.position.y + drone.speed.y;
        const [leftWall, rightWall] = droneYPoint;

        const droneX = drone.position.x;

        const isDroneCrached =
          droneX <= cave.width / 2 + leftWall ||
          droneX >= cave.width / 2 + rightWall;

        if (isDroneCrached) {
          clearInterval(interval);
          dispatch(setCrashed(true));
          dispatch(
            setStatistics({
              ...init.statistics,
              losses: init.statistics.losses + 1,
            })
          );
          return;
        }

        dispatch(setPosition({ ...drone.position, y: nextY }));
      }, 30);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cave.width, dispatch, drone.position, droneYPoint, scrolling]);

  return (
    <div
      style={{
        left: `${drone.position.x}px`,
        top: `${drone.position.y}px`,
        transition: "all 300ms ease",
      }}
      className={styles.drone}
    />
  );
};
