import { FC } from "react";
import { useReduxStore } from "../../../../hooks";
import styles from "./styles.module.scss";

export const Speedometer: FC = () => {
  const { drone } = useReduxStore();

  const percentage = (drone.speed.y / 5) * 100;

  return (
    <div className={styles.speedometer}>
      <svg viewBox="0 0 100 50">
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="#ddd"
          strokeWidth="10"
        />
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="#3498db"
          strokeWidth="10"
          strokeDasharray={`${percentage + 20} 100`}
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: "35px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {percentage}
      </div>
    </div>
  );
};
