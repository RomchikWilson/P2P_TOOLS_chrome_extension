import React, { createContext, ReactNode, useContext, useState } from "react";
import styles from "./ContentBlock.module.css";

interface ScrollContextType {
  blockedScroll: boolean;
  setBlockedScroll: (disabled: boolean) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const useScrollControl = () => {
  const context = useContext(ScrollContext);
  if (!context) {
      throw new Error("useScrollControl must be used within a ContentBlock");
  }
  return context;
};

interface Props {
  children: ReactNode;
  disableScroll?: boolean
}

const ContentBlock: React.FC<Props> = ({ children, disableScroll = false }) => {
  const [blockedScroll, setBlockedScroll] = useState(false);
  const overflowY = disableScroll || blockedScroll ? 'hidden' : 'auto';
  
  return (
    <ScrollContext.Provider value={{ blockedScroll, setBlockedScroll }}>
      <div className={styles.contentBlock} style={{overflowY: overflowY}}>
        {children}
      </div>
    </ScrollContext.Provider>
  );
};

export default ContentBlock;