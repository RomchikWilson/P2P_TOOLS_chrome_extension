import React, { ReactNode, useState } from "react";
import styles from "./CopyableBlock.module.css";

interface Props {
  children: ReactNode;
  copyableValue: string | number;
}

const CopyableBlock: React.FC<Props> = ({ children, copyableValue }) => {
  const [notified, setNotified] = useState(false);
  // @ts-ignore
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = async () => {
      try {
          await navigator.clipboard.writeText(String(copyableValue));
          setNotified(true);
          setTimeout(() => setNotified(false), 1000);
      } catch (error) {
          console.error('Failed to copy text:', error);
      }
  };

  return (
    <div className={styles.сopyableBlock} 
      onClick={handleClick} 
      onPointerEnter={() => {setIsHovered(true)}} 
      onPointerLeave={() => {setIsHovered(false)}}>
      <div className={`${styles.message} ${notified ? styles.visible : ""}`}>Copied</div>
      {children}
    </div>
  );
};

export default CopyableBlock;