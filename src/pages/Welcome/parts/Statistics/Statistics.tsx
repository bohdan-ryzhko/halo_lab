import { FC } from "react";
import { useAppDispatch, useReduxStore } from "../../../../hooks";
import { Button } from "antd";
import { resetStatistics } from "../../../../redux";
import styles from "./styles.module.scss";

export const Statistics: FC = () => {
  const { init } = useReduxStore();
  const dispatch = useAppDispatch();

  return (
    <div className={styles.wrapper}>
      <div className={styles.statistics}>
        {Object.entries(init.statistics).map(([key, value], index) => (
          <p key={index}>
            {key}: {value}
          </p>
        ))}
      </div>
      <Button onClick={() => dispatch(resetStatistics())} type="primary">
        Reset statistics
      </Button>
    </div>
  );
};
