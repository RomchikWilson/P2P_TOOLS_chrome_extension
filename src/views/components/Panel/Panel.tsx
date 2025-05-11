import React, { ReactNode } from "react";
import styles from "./Panel.module.css";

interface Props {
  children: ReactNode;
}

const Panel: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.panel}>
      {children}
    </div>
  );
};

export default Panel;