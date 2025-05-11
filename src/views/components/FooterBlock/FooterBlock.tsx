import React, { ReactNode } from "react";
import styles from "./FooterBlock.module.css";

interface Props {
  children: ReactNode;
}

const FooterBlock: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.footer}>
      {children}
    </div>
  );
};

export default FooterBlock;