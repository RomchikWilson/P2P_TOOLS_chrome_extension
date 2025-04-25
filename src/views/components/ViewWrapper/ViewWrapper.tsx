import React, { ReactNode } from "react";
import styles from "./ViewWrapper.module.css";

interface Props {
  children: ReactNode;
}

const ViewWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.view}>
      {children}
    </div>
  );
};

export default ViewWrapper;
