import React, { ReactNode } from "react";
import styles from "./ContentBlock.module.css";

interface Props {
  children: ReactNode;
  disableScroll?: boolean
}

const ContentBlock: React.FC<Props> = ({ children, disableScroll = false }) => {
  return (
    <div className={styles.contentBlock} style={{overflowY: disableScroll ? 'hidden' : 'auto'}}>
      {children}
    </div>
  );
};

export default ContentBlock;
