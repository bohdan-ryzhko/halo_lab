import { FC } from "react";
import { ColorRing } from "react-loader-spinner";
import styles from "./styles.module.scss";

type props = {
  size?: number;
  color?: string;
  fullScreen?: boolean;
};

export const Loader: FC<props> = ({
  size = 80,
  color = "#1677ff",
  fullScreen = false,
}) => {
  const colors = Array.from({
    length: 5,
  }).map(() => color) as [string, string, string, string, string];

  return (
    <div className={fullScreen ? styles.wrapper : undefined}>
      <ColorRing
        visible={true}
        height={`${size}`}
        width={`${size}`}
        ariaLabel="color-ring-loading"
        colors={colors}
      />
    </div>
  );
};
