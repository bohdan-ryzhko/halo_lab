import { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch, useReduxStore } from "../../../../hooks";
import { socket } from "../../../../utils";
import { Drone } from "../Drone";
import { setCaveCoordinates } from "../../../../redux";

const halfContainer = 250;

export const Cave: FC = () => {
  const { auth, init, cave, drone } = useReduxStore();
  const dispatch = useAppDispatch();
  const caveRef = useRef<HTMLDivElement | null>(null);
  const [scrolling, setScrolling] = useState(false);
  const [caveOffset, setCaveOffset] = useState(0);

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (auth.data.token === "" || !init.data?.id) return;

    const ws = socket<string>({
      endpoint: "cave",
      message: `player:${init.data.id}-${auth.data.token}`,
      onmessage: ({ data }) => {
        if (data === "finished") return;

        const [left, right] = data.split(",");

        if (isNaN(Number(left)) || isNaN(Number(right))) return;

        dispatch(setCaveCoordinates([Number(left), Number(right)]));
      },
      onerror: (event) => {
        console.log(event);
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
    const handleScroll = () => {
      if (caveRef.current) {
        const height = caveRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        if (height > windowHeight) {
          setScrolling(true);
        } else {
          setScrolling(false);
        }
      }
    };

    handleScroll();

    const observer = new MutationObserver(handleScroll);

    if (caveRef.current) {
      observer.observe(caveRef.current, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
    };
  }, [cave.data.length]);

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
  );
};
