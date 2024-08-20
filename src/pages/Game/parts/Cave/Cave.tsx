import { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch, useReduxStore, useScroll } from "../../../../hooks";
import { socket } from "../../../../utils";
import { Drone } from "../Drone";
import {
  setCaveCoordinates,
  setCaveError,
  setCaveStatus,
} from "../../../../redux";
import { wsStatuses } from "../../../../constants";
import { ExitGame } from "../../../../components";

const halfContainer = 250;

export const Cave: FC = () => {
  const { auth, init, cave, drone } = useReduxStore();
  const dispatch = useAppDispatch();
  const [scrolling, caveRef] = useScroll<HTMLDivElement>();
  const [caveOffset, setCaveOffset] = useState(0);

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (auth.data.token === "" || !init.data?.id) return;

    const ws = socket<string>({
      endpoint: "cave",
      message: `player:${init.data.id}-${auth.data.token}`,
      onmessage: ({ data }) => {
        if (data === "finished")
          return dispatch(setCaveStatus(wsStatuses.FINISHED));

        const [left, right] = data.split(",");

        if (isNaN(Number(left)) || isNaN(Number(right))) return;

        dispatch(setCaveCoordinates([Number(left), Number(right)]));
      },
      onerror: (event) => {
        dispatch(setCaveError(event));
      },
      onclose: (event) => {
        console.log(event);
      },
    });

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, [auth.data.token, dispatch, init.data?.id]);

  useEffect(() => {
    if (drone.isCrashed && wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, [drone.isCrashed]);

  useEffect(() => {
    const halfScreen = window.innerHeight / 2;

    if (drone.position.y > halfScreen) {
      setCaveOffset(drone.position.y - halfScreen);
    }
  }, [drone.position.y]);

  const leftWallPath = cave.data
    .map(([left], index) => `${halfContainer + left} ${index * 10}`)
    .join(" ");

  const rightWallPath = cave.data
    .map(([, right], index) => `${halfContainer + right} ${index * 10}`)
    .join(" ");

  const caveHeight = cave.data.length * 10;

  if (cave.data.length === 0) return null;

  return (
    <>
      {cave.error && <ExitGame />}

      {!cave.error && (
        <div
          style={{
            width: `${cave.width}px`,
            height: caveHeight,
            border: "1px solid black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px auto",
            position: "relative",
            transform: `translateY(-${caveOffset}px)`,
            transition: "transform 30ms linear",
          }}
          ref={caveRef}
        >
          <Drone scrolling={scrolling} />
          <svg width={`${cave.width}px`} height={caveHeight}>
            <path
              d={`M ${leftWallPath}`}
              fill="none"
              stroke="black"
              strokeWidth="1"
            />
            <path
              d={`M ${rightWallPath}`}
              fill="none"
              stroke="black"
              strokeWidth="1"
            />
          </svg>
        </div>
      )}
    </>
  );
};
